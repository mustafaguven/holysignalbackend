module "helloworld" {
  source = "../modules/"
  lambda_zip_location = "outputs/helloworld.zip"
  lambda_function_name = "helloworld"
  lambda_handler = "index.handler"
  zip_source_file = "../helloworld/index.js"
}
