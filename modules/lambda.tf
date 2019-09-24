
locals {
    lambda_zip_location = "${var.lambda_zip_location}"
}

data "archive_file" "zipping_lambda" {
  type        = "zip"
  #source_file = "${var.zip_source_file}"
  output_path = "${local.lambda_zip_location}"
  source_dir  = "${var.zip_source_dir}"
}

resource "aws_lambda_function" "lambda" {
  filename      = "${local.lambda_zip_location}"
  function_name = "${var.lambda_function_name}"
  #role          = "${aws_iam_role.lambda_role.arn}"  #==> ilk defa yaratiliyorsa bu satiri kullan alttakini yoruma cevir
  role          = "arn:aws:iam::813711103084:role/lambda_role"
  handler       = "${var.lambda_handler}"
  source_code_hash = "${filebase64sha256(local.lambda_zip_location)}"
  runtime = "nodejs8.10"

  environment {
    variables = {
      foo = "bar"
    }
  }
}
