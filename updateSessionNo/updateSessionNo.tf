module "lastLambda" {
  source = "../modules/"
  lambda_zip_location = "outputs/updateSessionNo.zip"
  lambda_function_name = "updateSessionNo"
  lambda_handler = "index.handler"
  zip_source_dir = "../updateSessionNo/code"
}
