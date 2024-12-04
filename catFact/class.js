
let facts = []
let body = document.getElementById("body")

let button = document.getElementById("getCatFact")


createContainer = (fact) => {
  let newDiv = document.createElement("div")
  newDiv.classList.add("container")
  newDiv.textContent = fact
  body.appendChild(newDiv)
}




async function getCatFact() {
  let result = await fetch("https://catfact.ninja/fact");
  result = await result.json();

  // Display loading message
  createContainer("Loading...");

  // Wait for 2 seconds
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Remove loading message
  document.querySelectorAll(".container").forEach(container => container.remove());

  // Display cat fact
  createContainer(result.fact);
}


button.addEventListener("click", () => {
  getCatFact()
})