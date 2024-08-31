output "QUIZSTAR_PUBLIC_IP" {
  value = aws_instance.quizstar-instance[0].public_ip
}

output "MYSQL_HOST" {
  value = aws_db_instance.quizstar-db.endpoint
}