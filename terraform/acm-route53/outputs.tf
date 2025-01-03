output "acm-certificate-arn" {
  description = "acm certificate arn"
  value       = module.acm-route53.acm-certificate-arn
}

output "route53-zone-id" {
  description = "route53 zone id"
  value       = module.acm-route53.route53-zone-id
}