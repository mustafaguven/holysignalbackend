module "lastLambda" {
  source = "../modules/"
  lambda_zip_location = "outputs/getFavouriteCountByAyahNumber.zip"
  lambda_function_name = "getFavouriteCountByAyahNumber"
  lambda_handler = "index.handler"
  zip_source_dir = "../getFavouriteCountByAyahNumber/code"
}
