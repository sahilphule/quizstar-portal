output "EC2_INSTANCE_PUBLIC_IP" {
  value = aws_instance.quizstar-instance[0].public_ip
}

output "MYSQL_HOST" {
  value = aws_db_instance.quizstar-db.address
}

output "AWS_STORAGE_BUCKET_NAME" {
  value = aws_s3_bucket.quizstar-bucket.tags.Name
}