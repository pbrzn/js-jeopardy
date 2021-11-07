let game;
let gameStarted = false;
let clueEngaged = false;
let array = Category.arrayOfIds();

const container = document.getElementById("container")

const masterBubble = document.createElement("div");
masterBubble.className = "bubble";
masterBubble.id = "master-bubble";

let categoryBubble = document.createElement("div");
categoryBubble.className = "category-bubble"

let clueBubble = document.createElement("div");
clueBubble.className = "clue-bubble"

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

function buildGame(game) {
  for (let i = 0; i < game.categories.length; i++) {
    let category = new Category().assignProperties(game.categories[i].id);
    categoryBubble.id = `category-${category.id}`
    categoryBubble.innerHTML = `${category.name}`
    container.appendChild(categoryBubble)

    const clues = category.clues;
    for (let i = 0; i < clues.length; i++) {
      let clue = new Clue(clues[i].id);
      clueBubble.id = `clue-${clue.id}`
      clueBubble.innerHTML = "$"`${clue.value}`
      container.appendChild(clueBubble)
    }
  }
}

if (gameStarted === false) {
  createMasterBubble()
  createStartMenu()
  const start = document.getElementById("start")

  start.addEventListener("click", () => {
    gameStarted = true;
    game = new Game(array);
    container.removeChild(masterBubble)
  })
};

if (gameStarted === true && clueEngaged === false) {
    buildGame(game);
};
