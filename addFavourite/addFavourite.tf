module "lastLambda" {
  source = "../modules/"
  lambda_zip_location = "outputs/addFavourite.zip"
  lambda_function_name = "addFavourite"
  lambda_handler = "index.handler"
  zip_source_dir = "../addFavourite/code"
}
