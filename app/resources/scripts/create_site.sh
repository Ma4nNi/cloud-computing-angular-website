#!/bin/bash
BUCKET=$1


echo "Delete bucked"
aws s3 rm s3://$BUCKET --recursive
aws s3api delete-bucket --bucket $BUCKET

echo "Create Bucket"
aws s3api create-bucket --bucket $BUCKET


echo "Create website in local"
grunt build
cd dist


echo "Upload to S3"
aws s3 sync . s3://$BUCKET --acl public-read

echo "Creating website"
aws s3api put-bucket-website --bucket $BUCKET --website-configuration "{\"IndexDocument\":{\"Suffix\":\"index.html\"},\"ErrorDocument\":{\"Key\":\"404.html\"}}"

firefox http://$BUCKET.s3-website-us-east-1.amazonaws.com
