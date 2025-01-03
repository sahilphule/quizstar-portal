module "acm-route53" {
  source = "github.com/sahilphule/templates/terraform/modules/aws/acm-route53"
  # source = "../../../templates/terraform/modules/aws/acm-route53"

  route53-properties = local.route53-properties
  acm-properties     = local.acm-properties
}