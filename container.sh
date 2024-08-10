#!bin/sh
cd /home/ec2-user/quizstar
docker login -u sahilphule0710 -p Sahil@2003
docker-compose down;
docker rmi -f $(docker images -aq)
docker-compose up -d