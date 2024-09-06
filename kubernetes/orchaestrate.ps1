cd "~/desktop/quizstar-portal/kubernetes"
minikube start
minikube docker-env | Invoke-Expression
kubens quizstar-portal
powershell -ExecutionPolicy Bypass './scripts/delete.ps1'
powershell -ExecutionPolicy Bypass './scripts/apply.ps1'