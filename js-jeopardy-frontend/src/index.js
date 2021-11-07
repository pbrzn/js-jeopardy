const startButton = document.createElement("button");
startButton.innerHTML = "Start A New Game"
document.body.appendChild(startButton)

startButton.addEventListener("click", () => {


})

const category = new Category().assignProperties(1);
const h1 = document.createElement("h1");
h1.innerHTML = category.name;
document.body.appendChild(h1);
