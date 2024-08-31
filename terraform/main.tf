resource "aws_vpc" "quizstar-vpc" {
  cidr_block           = var.vpc_cidr_block
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "quizstar-vpc"
  }
}

resource "aws_subnet" "quizstar-public-subnet" {
  vpc_id                  = aws_vpc.quizstar-vpc.id
  count                   = var.subnet_count.public
  cidr_block              = var.public_subnet_cidr_blocks[count.index]
  map_public_ip_on_launch = true
  availability_zone       = data.aws_availability_zones.available.names[count.index]

  tags = {
    Name = "quizstar-public-subnet-$(count.index)"
  }
}

resource "aws_subnet" "quizstar-private-subnet" {
  vpc_id            = aws_vpc.quizstar-vpc.id
  count             = var.subnet_count.private
  cidr_block        = var.private_subnet_cidr_blocks[count.index]
  availability_zone = data.aws_availability_zones.available.names[count.index]

  tags = {
    Name = "quizstar-private-subnet-$(count.index)"
  }
}

resource "aws_internet_gateway" "quizstar-igw" {
  vpc_id = aws_vpc.quizstar-vpc.id

  tags = {
    Name = "quizstar-igw"
  }
}

resource "aws_route_table" "quizstar-public-rtb" {
  vpc_id = aws_vpc.quizstar-vpc.id

  tags = {
    Name = "quizstar-public-rtb"
  }
}

resource "aws_route" "default-route" {
  route_table_id         = aws_route_table.quizstar-public-rtb.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.quizstar-igw.id
}

resource "aws_route_table_association" "quizstar-public-rtb-assoc" {
  route_table_id = aws_route_table.quizstar-public-rtb.id
  count          = var.subnet_count.public
  subnet_id      = aws_subnet.quizstar-public-subnet[count.index].id
}

resource "aws_route_table" "quizstar-private-rtb" {
  vpc_id = aws_vpc.quizstar-vpc.id

  tags = {
    Name = "quizstar-private-rtb"
  }
}

resource "aws_route_table_association" "quizstar-private-rtb-assoc" {
  route_table_id = aws_route_table.quizstar-private-rtb.id
  count          = var.subnet_count.private
  subnet_id      = aws_subnet.quizstar-private-subnet[count.index].id
}

resource "aws_security_group" "quizstar-ec2-sg" {
  name        = "quizstar-ec2-sg"
  description = "quizstar-ec2 security group"
  vpc_id      = aws_vpc.quizstar-vpc.id

  tags = {
    Name = "quizstar-ec2-sg"
  }
}

resource "aws_vpc_security_group_ingress_rule" "allow-ipv4-traffic" {
  security_group_id = aws_security_group.quizstar-ec2-sg.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = -1
  to_port           = -1
  ip_protocol       = "-1"
}

resource "aws_vpc_security_group_egress_rule" "allow-ipv4-traffic" {
  security_group_id = aws_security_group.quizstar-ec2-sg.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = -1
  to_port           = -1
  ip_protocol       = "-1"
}

resource "aws_security_group" "quizstar-db-sg" {
  name        = "quizstar-db-sg"
  description = "quizstar-db security group"
  vpc_id      = aws_vpc.quizstar-vpc.id

  tags = {
    Name = "quizstar-db-sg"
  }
}

resource "aws_vpc_security_group_ingress_rule" "allow-ec2-traffic" {
  security_group_id            = aws_security_group.quizstar-db-sg.id
  from_port                    = "3306"
  to_port                      = "3306"
  ip_protocol                  = "tcp"
  referenced_security_group_id = aws_security_group.quizstar-ec2-sg.id
}

resource "aws_db_subnet_group" "quizstar-db-subnet-group" {
  name        = "quizstar-db subnet group"
  description = "db subnet group for quizstar"
  subnet_ids  = [for subnet in aws_subnet.quizstar-private-subnet : subnet.id]
}

resource "aws_db_instance" "quizstar-db" {
  allocated_storage      = var.settings.database.allocated_storage
  db_name                = var.settings.database.db_name
  engine                 = var.settings.database.engine
  engine_version         = var.settings.database.engine_version
  instance_class         = var.settings.database.instance_class
  username               = var.db_username
  password               = var.db_password
  db_subnet_group_name   = aws_db_subnet_group.quizstar-db-subnet-group.id
  vpc_security_group_ids = [aws_security_group.quizstar-db-sg.id]
  publicly_accessible    = var.settings.database.publicly_accessible
  skip_final_snapshot    = var.settings.database.skip_final_snapshot

  tags = {
    Name = "quizstar-db"
  }
}

resource "aws_key_pair" "quizstar-key-pair" {
  key_name   = "quizstar-key"
  public_key = file("~/.ssh/quizstar-key.pub")
}

resource "aws_instance" "quizstar-instance" {
  count                  = var.settings.quizstar.count
  ami                    = data.aws_ami.linux-ami.id
  instance_type          = var.settings.quizstar.instance_type
  key_name               = aws_key_pair.quizstar-key-pair.id
  vpc_security_group_ids = [aws_security_group.quizstar-ec2-sg.id]
  subnet_id              = aws_subnet.quizstar-public-subnet[count.index].id
  user_data              = file("../startup-config.tpl")

  tags = {
    Name = "quizstar-instance$(count.index)"
  }
}

# resource "aws_eip" "quizstar-eip" {
#   count = var.settings.quizstar.count
#   instance = aws_instance.quizstar-instance[count.index].id
#   tags = {
#     Name = "quizstar-eip-$(count.index)"
#   }
# }