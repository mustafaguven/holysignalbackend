module "helloworld" {
  source = "../modules/"
  lambda_zip_location = "outputs/helloworld.zip"
  lambda_function_name = "helloworld"
  lambda_handler = "helloworld.hello"
  zip_source_file = "../helloworld/helloworld.js"
}
