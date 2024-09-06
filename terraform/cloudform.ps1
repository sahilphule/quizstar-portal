cd "~/desktop/quizstar-portal/terraform1"
terraform destroy -auto-approve
terraform apply -auto-approve
sed -i '/^EC2_INSTANCE_PUBLIC_IP/d' ../compose/.env
sed -i '/^MYSQL_HOST/d' ../compose/.env
sed -i '/^AWS_STORAGE_BUCKET_NAME/d' ../compose/.env
Add-Content ../compose/.env $(terraform output)
echo "added EC2_INSTANCE_PUBLIC_IP, MYSQL_HOST and AWS_STORAGE_BUCKET_NAME to .env file"
$ip = terraform output -json EC2_INSTANCE_PUBLIC_IP
Start-Sleep 40
scp -o StrictHostKeyChecking=no -i "~/.ssh/quizstar-key" ../compose/.env ec2-user@${ip}:quizstar-portal/compose/
echo "copied .env inside ec2-instance"
ssh -o StrictHostKeyChecking=no -i "~/.ssh/quizstar-key" ec2-user@$ip