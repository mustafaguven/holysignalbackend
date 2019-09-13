    aws configure

    ile ~/.aws config ve credentials dosyalari duzenlenir

    sonrasinda

1. her lambda klasorunde "terraform init" yapilir
2. sonrasinda deployment icin "terraform apply -auto-approve" kullanilir
3. silmek icin "terraform destroy" kullanilir.

ONEMLI NOT

eger policy ilk defa yaratilacaksa

      1. modules/lambda-iam.tf dosyasinin icerigini uncomment et
      2. lambda.tf > "aws_lambda_function" "lambda" > role asagidaki gibi olmali

        role          = "${aws_iam_role.lambda_role.arn}"

eger policy yaratilmissa terraform already exist hatasi veriyor, an itibariyle lambdalarda da terraform import kullanilamiyor
dolayisiyla yaratilan policy nin arn sini consoledan bulup role kisminda hep o olacakmis sekilde kullanmak gerekiyor

      1. modules/lambda-iam.tf dosyasinin tum icerigini yorum satiri haline getir
      2. diger lambdalarda kullanilan lambda role un arn sini consolden alip

        lambda.tf > "aws_lambda_function" "lambda" > role

      kodunda alttaki sekilde kullan

        role          = "arn:aws:iam::813711103084:role/lambda_role"
