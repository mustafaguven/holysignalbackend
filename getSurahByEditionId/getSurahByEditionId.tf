module "lastLambda" {
  source = "../modules/"
  lambda_zip_location = "outputs/getSurahByEditionId.zip"
  lambda_function_name = "getSurahByEditionId"
  lambda_handler = "index.handler"
  zip_source_dir = "../getSurahByEditionId/code"
}
