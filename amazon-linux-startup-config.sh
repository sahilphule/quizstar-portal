#!bin/sh
sudo yum update -y
sudo yum install docker -y
sudo systemctl start docker
sudo systemctl status docker
sudo systemctl enable docker
sudo usermod -a -G docker $(whoami)
newgrp docker
docker -v
# docker login

sudo yum update -y
sudo curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose -v

sudo yum update -y
sudo yum install git -y
git -v

sudo yum update -y
sudo yum install ruby -y
sudo yum install wget -y
cd /home/ec2-user
wget https://aws-codedeploy-ap-south-1.s3.ap-south-1.amazonaws.com/latest/install
chmod +x ./install
sudo ./install auto
sudo systemctl status codedeploy-agent