# Cloud-Resume
## Introduction
Applying my skills I have learnt from the AWS certificate to host my resume website on AWS cloud infrastructure. 


## AWS services to be implemented
* **S3** - To store website
* **DynamoDB** (on-demand pricing) - database to store website counter
* **Lambda** - Obtain updates and communicate changes via API to both DB and S3.
* **SQS Queue** - queue lambda jobs to avoid overwhelming the DB.
* **Cloudfront and Route 53** - Assigning domain to the website and point traffic to this domain from cloudfront distribution.
* **AWS SAM CLI** - Deploying all services using the IaC (infrastructure as code) approach. 


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


