
locals {
    lambda_zip_location = "${var.lambda_zip_location}"
}

data "archive_file" "helloworld" {
  type        = "zip"
  source_file = "${var.zip_source_file}"
  output_path = "${local.lambda_zip_location}"
}

resource "aws_lambda_function" "lambda" {
  filename      = "${local.lambda_zip_location}"
  function_name = "${var.lambda_function_name}"
  role          = "${aws_iam_role.lambda_role.arn}"
  handler       = "${var.lambda_handler}"

  # source_code_hash = "${base64sha256(file("lambda_function_payload.zip"))}"
  source_code_hash = "${filebase64sha256(local.lambda_zip_location)}"
  runtime = "nodejs8.10"

  environment {
    variables = {
      foo = "bar"
    }
  }
}


#
# locals {
#     lambda_zip_location = "outputs/helloworld.zip"
# }
#
# data "archive_file" "helloworld" {
#   type        = "zip"
#   source_file = "helloworld.js"
#   output_path = "${local.lambda_zip_location}"
# }
#
# resource "aws_lambda_function" "helloworld" {
#   filename      = "${local.lambda_zip_location}"
#   function_name = "helloworld"
#   role          = "${aws_iam_role.lambda_role.arn}"
#   handler       = "helloworld.hello"
#
#   # source_code_hash = "${base64sha256(file("lambda_function_payload.zip"))}"
#   source_code_hash = "${filebase64sha256(local.lambda_zip_location)}"
#   runtime = "nodejs8.10"
#
#   environment {
#     variables = {
#       foo = "bar"
#     }
#   }
# }
