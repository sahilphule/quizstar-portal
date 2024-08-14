docker-compose -f docker-compose.yaml down
docker rmi sahilphule0710/django-app
# docker rmi nginx
# docker rmi mysql
docker-compose -f docker-compose.yaml up -d
docker cp ./nginx.conf nginx-service:/etc/nginx/conf.d/nginx.conf