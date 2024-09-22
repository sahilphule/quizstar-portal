#!bin/sh
sudo yum update
sudo yum install -y docker
sudo usermod -a -G docker ec2-user
newgrp docker
sudo systemctl start docker.service

sudo yum update
sudo curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

sudo yum update
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo sh -c 'echo -e "[azure-cli]
name=Azure CLI
baseurl=https://packages.microsoft.com/yumrepos/azure-cli
enabled=1
gpgcheck=1
gpgkey=https://packages.microsoft.com/keys/microsoft.asc" > /etc/yum.repos.d/azure-cli.repo'
sudo yum install -y azure-cli

sudo yum update
sudo yum install -y git

cd /home/ec2-user/
git clone -b dev https://github.com/sahilphule/quizstar-portal.git

sudo chmod 777 -R quizstar-portal/*

sudo yum update
sudo yum install -y ruby
sudo yum install -y wget
cd /home/ec2-user
wget https://aws-codedeploy-ap-south-1.s3.ap-south-1.amazonaws.com/latest/install
chmod +x ./install
sudo ./install auto