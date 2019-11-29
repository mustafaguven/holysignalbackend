module "lastLambda" {
  source = "../modules/"
  lambda_zip_location = "outputs/getMember.zip"
  lambda_function_name = "getMember"
  lambda_handler = "index.handler"
  zip_source_dir = "../getMember/code"
}
