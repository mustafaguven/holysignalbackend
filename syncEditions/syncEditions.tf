module "lastLambda" {
  source = "../modules/"
  lambda_zip_location = "outputs/syncEditions.zip"
  lambda_function_name = "syncEditions"
  lambda_handler = "index.handler"
  zip_source_dir = "../syncEditions/code"
}
