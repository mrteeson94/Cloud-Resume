# Cloud-Resume
## Introduction
Applying my skills I have learnt from the AWS certificate to host my resume website on AWS cloud infrastructure. 


## AWS services to be implemented
* **S3** - To store website
* **DynamoDB** (on-demand pricing) - database to store website counter
* **Lambda** - Obtain updates and communicate changes via API to both DB and S3.
* **SQS Queue** - queue lambda jobs to avoid overwhelming the DB.
* **Cloudfront and Route 53** - Assigning domain to the website and point traffic to this domain from cloudfront distribution.
* **Cloudformation/Terrafrom** - Deploying all services using the IaC (infrastructure as code) approach using terraform. 


## Stage 1 - Building the front-end 

* Setting up git repo on local env.
* update HTML elements with my resume content.
* test locally and push changes to github.
* Created js function **getVisitCount()** which will implement the view counter logic on the webpage, triggered by API request from AWS Lambda when you visit the page. :)
```JS
// WIP: will GET live data update from lambda on view count triggered by events on s3.
  const functionApi= '';
//Gets live view data from API and then update the HTML element on the webpage.
  const getVisitCount = () => {
  let count = 50;
  fetch(functionApi).then(Response => {
    return Response.json()
  }).then(Response => {
    console.log("Website called function API.");
    count = Response.count;
    document.getElementById("Counter").innerText = count;
  }).catch(function(error){
    console.log(error)
});
return count;
}
```


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
