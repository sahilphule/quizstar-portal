kubectl apply -f ../docker-secret.yml
kubectl apply -f ../secret.yml
kubectl apply -f ../configmap.yml

kubectl apply -f ../mysql/pv.yml
kubectl apply -f ../mysql/pvc.yml
kubectl apply -f ../mysql/deployment.yml
kubectl apply -f ../mysql/service.yml

kubectl apply -f ../app/pv.yml
kubectl apply -f ../app/pvc.yml
kubectl apply -f ../app/deployment.yml
kubectl apply -f ../app/service.yml

# kubectl apply -f ../redis/deployment.yml
# kubectl apply -f ../redis/service.yml

# kubectl apply -f ../celery/worker-deployment.yml
# kubectl apply -f ../celery/beat-deployment.yml

kubectl apply -f ../nginx/deployment.yml
kubectl apply -f ../nginx/service.yml

kubectl get all -n quizstar-portal