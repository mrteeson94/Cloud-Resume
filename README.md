# Cloud-Resume
## Introduction
Applying my skills I have learnt from the AWS certificate to host my resume website on AWS cloud infrastructure. 

## AWS services to be implemented
* **S3** - To store website
* **DynamoDB** (on-demand pricing) - database to store website counter
* **Lambda** - Obtain updates and communicate changes via API to both DB and S3.
* **SQS Queue** - queue lambda jobs to avoid overwhelming the DB.
* **Cloudfront and Route 53** - Assigning domain to the website and point traffic to this domain from cloudfront distribution.
* **AWS SAM CLI** - Deploying all services via IaC (infrastructure as code) approach. 

