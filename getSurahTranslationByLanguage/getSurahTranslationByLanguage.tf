module "lastLambda" {
  source = "../modules/"
  lambda_zip_location = "outputs/getSurahTranslationByLanguage.zip"
  lambda_function_name = "getSurahTranslationByLanguage"
  lambda_handler = "index.handler"
  zip_source_dir = "../getSurahTranslationByLanguage/code"
}
