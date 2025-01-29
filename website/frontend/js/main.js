window.addEventListener('DOMContentLoaded', (event) => {
  updateCounter();
  logVisitorInfo();
})

console.log("JS triggered")

// #1 Function sends a request to lambda function which lambda will return JSON file containing the updated view counter data.
async function updateCounter() {
  try{
    let response = await fetch("https://kn3ighjdokzlf7gzssmkvzom2y0kcubx.lambda-url.ap-southeast-2.on.aws/")
    let data = await response.json();
    console.log(`aws lambda respond with current view: ${data}`);
    document.getElementById("counter").innerText = data;
    console.log("exit function")
  } catch(error){
    console.error("Error detected:",error);
    console.log("exit error")
  }
}

// #2 Function to log visitor's IP and time in sydney timezone
async function logVisitorInfo() {
  try{
    //Fetch the uers IP address from an external service
    let ipResponse = await fetch("https://api64.ipify.org?format=json");
    let ipData = await ipResponse.json();
    
    //Get session's time in Sydney Timezone.
    let sydneyTime = new Date().toLocaleString("en-AU", {timezone: "Australia/Sydney"});

    console.log(`Visitor IP: ${ipData.ip}`);
    console.log(`Vist time:${sydneyTime}`);
  }
  catch(error){
    console.error("Error occured when fetching visitors info",error);
  }
}