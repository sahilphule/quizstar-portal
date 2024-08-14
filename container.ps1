docker-compose -f docker-compose.yml down
docker rmi sahilphule0710/django-app
# docker rmi nginx
# docker rmi mysql
docker-compose -f docker-compose.yml up -d
docker cp ./default.conf nginx-service:/etc/nginx/conf.d/default.conf