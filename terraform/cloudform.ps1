Set-Location '~/desktop/quizstar-portal/terraform'
printf '\ndestroying infrastructure if present\n\n'
terraform destroy -auto-approve
printf '\nprovisioning infrastructure\n\n'
terraform apply -auto-approve
sed -i '/^INSTANCE_PUBLIC_IP/d' ../compose/.env
sed -i '/^MYSQL_HOST/d' ../compose/.env
sed -i '/^AWS_STORAGE_BUCKET_NAME/d' ../compose/.env
printf '\nadding EC2_INSTANCE_PUBLIC_IP, MYSQL_HOST and AWS_STORAGE_BUCKET_NAME to .env file\n\n'
Add-Content ../compose/.env $(terraform output)
$ip = terraform output -json INSTANCE_PUBLIC_IP
Start-Sleep 40
printf '\ncopying .env inside ec2-instance\n\n'
scp -o StrictHostKeyChecking=no -i '~/.ssh/quizstar-key' ../compose/.env ec2-user@${ip}:quizstar-portal/compose/
printf '\nssh to server\n\n'
ssh -o StrictHostKeyChecking=no -i "~/.ssh/quizstar-key" ec2-user@$ip