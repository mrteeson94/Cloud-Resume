window.addEventListener(('DomContentLoaded'), (event) => {
  getVisitCount();
})

const functionApi = '';

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