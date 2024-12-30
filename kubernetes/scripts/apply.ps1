kubectl apply -f ../accessories/docker-secret.yml
kubectl apply -f ../accessories/secrets.yml
kubectl apply -f ../accessories/configmap.yml
kubectl create configmap nginx-conf-configmap -n quizstar-portal --from-file=../../app/nginx/default.conf

kubectl apply -f ../mysql/pv.yml
kubectl apply -f ../mysql/pvc.yml
kubectl apply -f ../mysql/deployment.yml
kubectl apply -f ../mysql/service.yml

Start-Sleep 60

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