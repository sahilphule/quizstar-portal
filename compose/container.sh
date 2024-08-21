#!bin/sh
cd /home/ec2-user/quizstar-portal
docker-compose -f docker-compose.yml down;
# docker rmi sahilphule0710/app
# docker rmi nginx
# docker rmi mysql
# docker rmi -f $(docker images -aq)
docker-compose -f docker-compose.yml up -d