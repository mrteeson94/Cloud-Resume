# Cloud-Resume
## Introduction
Applying my skills I have learnt from the AWS certificate to host my resume website on AWS cloud infrastructure.

Website link: https://d14agfb5ms2whd.cloudfront.net (still WIP)

## Tech-Stack
* **S3** - To store website
* **DynamoDB** (on-demand pricing) - database to store website counter
* **AWS Lambda** - Obtain updates and communicate changes via API to both DB and S3.
* **SQS Queue** - queue lambda jobs to avoid overwhelming the DB.
* **Cloudfront and Route 53** - Assigning domain to the website and point traffic to this domain from cloudfront distribution.
* **Terrafrom** - Deploying all services using the IaC (infrastructure as code) approach using terraform. 
* **Github Actions** - CI/CD implementation


## Stage 1 - Building the front-end 

* Setting up git repo on local env.
* update HTML elements with my resume content.
* test locally and push changes to github.


## Stage 2 - Deploying Static website on AWS
* Create S3 bucket to store all files 
* Create a Cloudfront (CDN) distribution with it's origin linked to the S3 bucket
* Have the CDN generated policy copied into the s3 bucket policy to allow cloudfront read access.
* Static website should be accessible with cloudfront url while s3 objects is set to private for security. 


##  Hurdle from 15-16/01/2025
**Cloudfront domain url display '403 error'** - Cloudfront having permission issue accessing s3 root object.

**Troubleshooting**:
* S3 Object encryption check if it is AWS-KMS 
* Review bucket policy for explicit deny, misused ARN or AWS services.
* Review bucket ownership (confirmed s3 bucket is owned by awsAdmin user).
* s3 object url can be accessed by admin (confirmed only with bucket policy containing 'PublicReadGetObject').

 ***FIX*** - Root index.html had wrong dir pathing resulting to the redirected webpage not existing and thus resulting to the 403 page. Reason for root index.html, cloudfront had issue accessing the subfolder that houses the index.html so i have created this file to tackle the issue. 



 ## Stage 3 - Creating lambda function and Dynamodb table
* Create dynamodb table (Partition key = id, attribute = views)
* Create a Lambda function to interact with DynamoDB in updating the view count. I have chosen python to write my code.
* Create IAM policy for Access to DynamoDB and attach to lambda role in IAM aws service. Attach this to the lambda function to allow access to dynamodb. Link to policy: https://aws.amazon.com/blogs/security/how-to-create-an-aws-iam-policy-to-grant-aws-lambda-access-to-an-amazon-dynamodb-table/ 
* Write a JS function to handle the API GET request and retrieve the updated view data.

##  Hurdle from 17/01/2025
**Issue 1: Table schema mismatch with test case** - Fixed the issue via changing the table schema in removing CountView (Sort Key), leaving only the partition key (id). Learning experience with nosql, time to unlearn my t-sql schemas habits.

**Issue 2: Internal server error** - lambda having permission issue accessing dynamodb. 

Fixed via creating IAM policy and assuming this to lambda role, updated instructions with this fix!

 ## Stage 4 - CI/CD integration with Github
 * Github workflow folder created
 * Create a .yaml folder containing logic to upload website dir to the s3 bucket.
 * Every push to main branch will now trigger Github Actions to deploy the code to aws s3.
 * I need to run an invalidation event on cloudfront to remove cache content of the old s3 content to view the updated website.


 ## Stage 5 - Creating the cloud infrastructure with Terraform (IaC)
* Install terraform to PC
* Create infrastructure folder to house all terraform env files (main, provider, and scripts)
* Create python script which will contain the lambda function.
* Code infrastructure provision logic in main.tf file for creating the lambda function, the policy for it to access dynamodb and public url. 

**Syntax to remember when using terraform:**
```terraform
#Creates terraform dir environment
terraform init 

#Shows resource created/modified/deleted if tf executes
terraform plan 

#Executes terraform config file to deploy resources 
terraform apply
```