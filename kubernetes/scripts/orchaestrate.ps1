Set-Location '~/desktop/quizstar-portal/kubernetes/scripts'
printf '\ndeleting manifest byproducts if present\n\n'
powershell -ExecutionPolicy Bypass './delete.ps1'
printf '\napplying manifest files\n\n'
powershell -ExecutionPolicy Bypass './apply.ps1'
printf '\nrestarting app deployment\n'
Start-Sleep 20
kubectl rollout restart deployment.apps/app-deployment
printf '\ninitiating browser service for application access\n\n'
minikube service nginx-service -n quizstar-portal