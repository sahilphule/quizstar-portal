kubectl apply -f docker-secret.yaml
kubectl apply -f secret.yaml
kubectl apply -f configmap.yaml

kubectl apply -f mysql/pv.yaml
kubectl apply -f mysql/pvc.yaml
kubectl apply -f mysql/deployment.yaml
kubectl apply -f mysql/service.yaml

kubectl apply -f django-app/pv.yaml
kubectl apply -f django-app/pvc.yaml
kubectl apply -f django-app/deployment.yaml
kubectl apply -f django-app/service.yaml

# kubectl apply -f redis/deployment.yaml
# kubectl apply -f redis/service.yaml

# kubectl apply -f celery/worker-deployment.yaml
# kubectl apply -f celery/beat-deployment.yaml

kubectl apply -f nginx/deployment.yaml
kubectl apply -f nginx/service.yaml

kubectl get all -n quizstar-portal

docker cp ./nginx.conf nginx-service:/etc/nginx/conf.d/nginx.conf