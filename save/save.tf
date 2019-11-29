module "lastLambda" {
  source = "../modules/"
  lambda_zip_location = "outputs/save.zip"
  lambda_function_name = "save"
  lambda_handler = "index.handler"
  zip_source_dir = "../save/code"
}
