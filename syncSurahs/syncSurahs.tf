module "lastLambda" {
  source = "../modules/"
  lambda_zip_location = "outputs/syncSurahs.zip"
  lambda_function_name = "syncSurahs"
  lambda_handler = "index.handler"
  zip_source_dir = "../syncSurahs/code"
}
