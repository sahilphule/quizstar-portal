variable "aws_region" {
  description = "AWS cloud formation region"
  type = string
}

variable "vpc_cidr_block" {
  description = "CIDR block for VPC"
  type        = string
}

variable "subnet_count" {
  description = "Number of Subnets"
  type        = map(number)
}

variable "public_subnet_cidr_blocks" {
  description = "Available CIDR blocks for public subnets"
  type        = list(string)
}

variable "private_subnet_cidr_blocks" {
  description = "Available CIDR blocks for private subnets"
  type        = list(string)
}

variable "settings" {
  description = "Configuration settings"
  type        = map(any)
}

variable "db_username" {
  description = "Database master user"
  type        = string
  sensitive   = true
}

variable "db_password" {
  description = "Database master user password"
  type        = string
  sensitive   = true
}

variable "bucket_name" {
  description = "Bucket name"
  type = string
}