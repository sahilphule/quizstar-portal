#!bin/sh
cd /home/ec2-user/quizstar-portal/compose
docker-compose -f docker-compose.yml down -v
docker-compose -f docker-compose.yml up -d
# sleep 10
# docker restart app-service
docker-compose ps