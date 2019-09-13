module "getAllTranslations" {
  source = "../modules/"
  lambda_zip_location = "outputs/getAllTranslations.zip"
  lambda_function_name = "getAllTranslations"
  lambda_handler = "index.handler"
  zip_source_file = "../getAllTranslations/index.js"
}
