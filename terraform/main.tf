module "vpc" {
  source = "github.com/sahilphule/templates/terraform/modules/aws/vpc"
  # source = "../../templates/terraform/modules/aws/vpc"

  vpc-properties = local.vpc-properties
}

module "s3" {
  source = "github.com/sahilphule/templates/terraform/modules/aws/s3"
  # source = "../../templates/terraform/modules/aws/s3"

  s3-properties = local.s3-properties
}

module "rds" {
  source = "github.com/sahilphule/templates/terraform/modules/aws/rds"
  # source = "../../templates/terraform/modules/aws/rds"

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
  # source = "../../templates/terraform/modules/aws/ec2"

  ec2-properties = local.ec2-properties

  vpc-id = local.vpc-id
  vpc-public-subnets = local.vpc-public-subnets
}