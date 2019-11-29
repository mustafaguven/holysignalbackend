module "lastLambda" {
  source = "../modules/"
  lambda_zip_location = "outputs/signIn.zip"
  lambda_function_name = "signIn"
  lambda_handler = "index.handler"
  zip_source_dir = "../signIn/code"
}
