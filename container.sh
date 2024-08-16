#!bin/sh
cd /home/ec2-user/quizstar-portal
docker-compose -f docker-compose.yml down;
docker rmi django-app
# docker rmi nginx
# docker rmi mysql
# docker rmi -f $(docker images -aq)
docker-compose -f docker-compose.yml up -d
docker cp ./default.conf nginx-service:/etc/nginx/conf.d/default.conf