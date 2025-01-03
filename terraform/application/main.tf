module "vpc" {
  source = "github.com/sahilphule/templates/terraform/modules/aws/vpc"
  # source = "../../../templates/terraform/modules/aws/vpc"

  vpc-properties = local.vpc-properties
}

module "s3-bucket" {
  source = "github.com/sahilphule/templates/terraform/modules/aws/s3"
  # source = "../../../templates/terraform/modules/aws/s3"

  s3-bucket-properties = local.s3-bucket-properties
}

resource "aws_s3_bucket_policy" "s3-bucket-policy" {
  bucket = local.s3-bucket-id

  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Effect" : "Allow",
        "Principal" : "*",
        "Action" : "*",
        "Resource" : "arn:aws:s3:::${local.s3-bucket-properties.s3-bucket-name}/*"
      }
    ]
  })

  depends_on = [
    module.s3-bucket
  ]
}

module "rds" {
  source = "github.com/sahilphule/templates/terraform/modules/aws/rds"
  # source = "../../../templates/terraform/modules/aws/rds"

  rds-properties          = local.rds-properties
  bastion-host-properties = local.bastion-host-properties

  vpc-id              = local.vpc-id
  vpc-public-subnets  = local.vpc-public-subnets
  vpc-private-subnets = local.vpc-private-subnets

  depends_on = [
    module.vpc
  ]
}

module "ec2" {
  source = "github.com/sahilphule/templates/terraform/modules/aws/ec2"
  # source = "../../../templates/terraform/modules/aws/ec2"

  ec2-properties = local.ec2-properties

  vpc-id             = local.vpc-id
  vpc-public-subnets = local.vpc-public-subnets

  depends_on = [
    module.s3-bucket,
    module.rds
  ]
}

# module "eip" {
#   # source = "github.com/sahilphule/templates/terraform/modules/aws/eip"
#   source = "../../../templates/terraform/modules/aws/eip"

#   eip-properties = local.eip-properties

#   depends_on = [
#     module.ec2
#   ]
# }

module "load-balancer" {
  source = "github.com/sahilphule/templates/terraform/modules/aws/load-balancer"
  # source = "../../../templates/terraform/modules/aws/load-balancer"

  load-balancer-properties = local.load-balancer-properties
  vpc-id                   = local.vpc-id
  vpc-public-subnets       = local.vpc-public-subnets
  acm-certificate-arn      = local.acm-certificate-arn

  depends_on = [
    module.vpc
  ]
}

resource "aws_alb_target_group_attachment" "tg-attachment" {
  target_group_arn = local.load-balancer-tg-arn
  target_id        = local.ec2-instance-id

  depends_on = [
    module.ec2,
    module.load-balancer
  ]
}

module "route53-record" {
  source = "github.com/sahilphule/templates/terraform/modules/aws/route53-record"
  # source = "../../../templates/terraform/modules/aws/route53-record"

  route53-record-properties = local.route53-record-properties
  route53-zone-id           = local.route53-zone-id

  depends_on = [
    module.load-balancer
  ]
}