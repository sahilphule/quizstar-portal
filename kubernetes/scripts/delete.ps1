kubectl delete deployment/nginx-deployment -n quizstar-portal
kubectl delete service/nginx-service -n quizstar-portal

# kubectl delete deployment/beat-deployment -n quizstar-portal
# kubectl delete deployment/worker-deployment -n quizstar-portal

# kubectl delete deployment/redis-deployment -n quizstar-portal
# kubectl delete service/redis-service -n quizstar-portal

kubectl delete deployment/app-deployment -n quizstar-portal
kubectl delete service/app-service -n quizstar-portal
kubectl delete pvc staticfiles-pvc -n quizstar-portal
kubectl delete pv staticfiles-pv -n quizstar-portal

kubectl delete deployment/mysql-deployment -n quizstar-portal
kubectl delete service/mysql-service -n quizstar-portal
kubectl delete pvc mysql-pvc -n quizstar-portal
kubectl delete pv mysql-pv -n quizstar-portal

kubectl delete configmap nginx-conf-configmap -n quizstar-portal
kubectl delete configmap quizstar-portal-configmap -n quizstar-portal
kubectl delete secret quizstar-portal-secrets -n quizstar-portal
kubectl delete secret docker-secret -n quizstar-portal

printf '\n'
kubectl get pv -n quizstar-portal
printf '\n'
kubectl get pvc -n quizstar-portal
printf '\n'
kubectl get secrets -n quizstar-portal
printf '\n'
kubectl get configmaps -n quizstar-portal
printf '\n'
kubectl get all -n quizstar-portal