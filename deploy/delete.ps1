kubectl delete deployment/nginx-deployment -n quizstar-portal
kubectl delete service/nginx-service -n quizstar-portal

# kubectl delete deployment/beat-deployment -n quizstar-portal
# kubectl delete deployment/worker-deployment -n quizstar-portal

# kubectl delete deployment/redis-deployment -n quizstar-portal
# kubectl delete service/redis-service -n quizstar-portal

kubectl delete deployment/django-app-deployment -n quizstar-portal
kubectl delete service/django-app-service -n quizstar-portal
kubectl delete pvc django-app-pvc -n quizstar-portal
kubectl delete pv django-app-pv -n quizstar-portal

kubectl delete deployment/mysql-deployment -n quizstar-portal
kubectl delete service/mysql-service -n quizstar-portal
kubectl delete pvc mysql-pvc -n quizstar-portal
kubectl delete pv mysql-pv -n quizstar-portal

kubectl delete configmap app-configmap -n quizstar-portal
kubectl delete secret app-secret -n quizstar-portal
kubectl delete secret docker-secret -n quizstar-portal

kubectl get all -n quizstar-portal
kubectl get pvc -n quizstar-portal
kubectl get pv -n quizstar-portal
kubectl get secrets -n quizstar-portal