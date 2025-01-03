output "AWS_STORAGE_BUCKET_NAME" {
  description = "s3 bucket name"
  value = local.s3-bucket-properties.s3-bucket-name
}

output "MYSQL_HOST" {
  description = "mysql db address"
  value       = module.rds.db-address
}

output "BASTION_HOST_PUBLIC_IP" {
  description = "bastion host public ip"
  value       = module.rds.bastion-host-public-ip
}

output "INSTANCE_PUBLIC_IP" {
  description = "ec2 instance public ip"
  value       = module.ec2.ec2-instance-public-ip
}

# output "eip" {
#   value = module.eip.eip
# }