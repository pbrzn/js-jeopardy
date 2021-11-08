let game;
let gameStarted = false;
let clueEngaged = false;
const categoryIdArray = Category.arrayOfIds();

const container = document.getElementById("container")

const masterBubble = document.createElement("div");
masterBubble.className = "bubble";
masterBubble.id = "master-bubble";

function createMasterBubble() {
  container.appendChild(masterBubble)
}

function createStartMenu() {
  const welcomeDiv = document.createElement("div");
  welcomeDiv.className = "bubble-text";
  welcomeDiv.id = "welcome";
  masterBubble.appendChild(welcomeDiv);

  const p1 = document.createElement("p");
  p1.innerHTML = "WELCOME TO JAVASCRIPT JEOPARDY!"
  welcomeDiv.appendChild(p1)

  const p2 = document.createElement("p");
  p2.id = "start"
  p2.innerHTML = "<u>READY TO PLAY?</u>"
  welcomeDiv.appendChild(p2)
}

function buildGame(gameObj) {
  const gameBox = document.createElement("div");
  gameBox.className = "game-container"
  container.appendChild(gameBox);

  const categories = gameObj.categories
  for (let i = 0; i < categories.length; i++) {
    let category = categories[i];
    let categoryBubble = document.createElement("div");
    categoryBubble.className = "category-bubble";
    categoryBubble.id = `category-${i+1}`;
    categoryBubble.innerHTML = category.name;
    gameBox.appendChild(categoryBubble);
    const clueBox = document.createElement("div");
    clueBox.className = "clue-container"
    clueBox.id = `box-${i+1}`
    container.appendChild(clueBox);


    const clues = gameObj.clues.filter(c => c.category_id === category.id)
    console.log(clues)
    for (let i = 0; i < clues.length; i++) {
      let clue = clues[i];
      let clueBubble = document.createElement("div");
      clueBubble.className = "clue-bubble";
      clueBubble.id = `clue-${clue.id}`;
      clueBubble.innerHTML = "$" + clue.value;
      clueBox.appendChild(clueBubble);
    }
  }
}

if (gameStarted === false) {
  createMasterBubble();
  createStartMenu();
  const start = document.getElementById("start")

  start.addEventListener("click", () => {
    const data = Object.assign({}, { category_ids: categoryIdArray })

    const configObject = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    }

    fetch("http://localhost:3000/games", configObject)
    .then(resp => resp.json())
    .then(function(json) {
      game = new Game(json.id, json.categories, json.clues, json.score)
      container.removeChild(masterBubble);
      buildGame(game);
    })
  })
};
