terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.80.0"
    }
  }
}

provider "aws" {
  region = local.aws_region
  # shared_config_files = ["~/.aws/config"]
  shared_credentials_files = ["~/.aws/credentials"]
}