window.addEventListener('DOMContentLoaded', (event) => {
  updateCounter();
})

console.log("JS triggered")

// #Function sends a request to lambda function which lambda will return JSON file containing the updated view counter data.
async function updateCounter() {
  try{
    // let response = await fetch("https://kn3ighjdokzlf7gzssmkvzom2y0kcubx.lambda-url.ap-southeast-2.on.aws/")
    // let data = await response.json();
    let data = 25;
    // console.log(`aws lambda respond with current view: ${data}`);
    document.getElementById("counter").innerText = data;
    console.log("exit function")
  } catch(error){
    console.error("Error detected:",error);
    console.log("exit error")
  }
}