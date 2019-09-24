module "lastLambda" {
  source = "../modules/"
  lambda_zip_location = "outputs/lastLambda.zip"
  lambda_function_name = "lastLambda"
  lambda_handler = "index.handler"
  zip_source_dir = "../lastLambda/code"
}
