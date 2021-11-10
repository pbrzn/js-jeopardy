//GLOBAL VARIABLES
let game;
let clue;
let clueToRender;
const answeredClues = [];
const categoryIdArray = Category.arrayOfIds();
const allCategoryInstances = [];
let scoreDiv;
let counter = 1;

let container = document.getElementById("container")
const menuBubble = document.createElement("div");
menuBubble.className = "bubble";
menuBubble.id = "master-bubble";

let gameContainer = document.createElement("div.game-container");
gameContainer.id = "1"

//START MENU ON DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  container.appendChild(menuBubble)
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
      container.removeChild(menuBubble);
      renderBoard(game);
    })
  })
})

function createStartMenu() {
  const welcomeDiv = document.createElement("div");
  welcomeDiv.className = "bubble-text";
  welcomeDiv.id = "welcome";
  menuBubble.appendChild(welcomeDiv);

  const p1 = document.createElement("p");
  p1.innerHTML = "WELCOME TO JAVASCRIPT JEOPARDY!"
  welcomeDiv.appendChild(p1)

  const p2 = document.createElement("p");
  p2.id = "start"
  p2.innerHTML = "<u>READY TO PLAY?</u>"
  welcomeDiv.appendChild(p2)
}

// function buildGame(gameObj) {
//   renderBoard(categories);
// }

function dataToInstancesOfCategories(gameObj) {
  const categories = gameObj.categories;
  for (let i = 0; i < categories.length; i++) {
    fetch(`http://localhost:3000/categories/${categories[i].id}`)
    .then(resp => resp.json())
    .then(function(json) {
      let category = new Category(json.id, json.name, json.clues);
      allCategoryInstances.push(category)
    });
  }
}

function renderBoard(gameObj) {
  const categories = gameObj.categories;
  scoreDiv = document.createElement("div");
  scoreDiv.id = "score";
  scoreDiv.innerText = "CURRENT SCORE: $" + gameObj.score;
  container.appendChild(scoreDiv);
  container.appendChild(gameContainer)
  for (let i = 0; i < categories.length; i++) {
    let category = allCategoryInstances.find((c) => c.id === categories[i].id)
    if (!!category) {
      persistData(category)
    } else {
      fetch(`http://localhost:3000/categories/${categories[i].id}`)
      .then(resp => resp.json())
      .then(function(json) {
        let category = new Category(json.id, json.name, json.clues);
        allCategoryInstances.push(category)
        persistData(category)
      });
    }
  }
}


//ONCE A CLUE IS CLICKED ON IT WILL RENDER THAT CLUE'S QUESTION
//AND A TEXT INPUT BAR IN THE MASTER BUBBLE
function renderClue(clueId) {
  fetch(`http://localhost:3000/clues/${clueId}`)
  .then(resp => resp.json())
  .then(function(json) {
    clueToRender = new Clue(json.id, json.value, json.question, json.answer);

    const selectedClueBubble = document.createElement("div")
    selectedClueBubble.className = "bubble"
    selectedClueBubble.id = "selected-clue-bubble"
    discardState()
    container.appendChild(selectedClueBubble);

    const questionDiv = document.createElement("div");
    questionDiv.id = "question";
    questionDiv.innerHTML = clueToRender.question;
    selectedClueBubble.appendChild(questionDiv);

    const answerForm = document.createElement("form");
    answerForm.id = "answer";
    selectedClueBubble.appendChild(answerForm);

    const answerLabel = document.createElement("label");
    answerLabel.id = "answer-label"
    answerLabel.innerText = "What is...? ";

    const answerInput = document.createElement("input");
    answerInput.id = "answer-input"


    const answerSubmit = document.createElement("input");
    answerSubmit.type = "submit"
    answerSubmit.id = "answer-submit"
    answerSubmit.innerText = "Submit Answer"

    answerForm.appendChild(answerLabel)
    answerForm.appendChild(answerInput)
    answerForm.appendChild(answerSubmit)

    answerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (clueToRender.answer.includes(answerInput.value.toUpperCase())) {
        // clueToRender.answered = true;
        clueToRender.answeredCorrectly = true;
        game.score += clueToRender.value
        updateGame()
      } else {
        // clueToRender.answered = true;
        clueToRender.answeredCorrectly = false;
        game.score -= clueToRender.value
        updateGame()
      }
    })

  })
  .catch(error => console.log(error))
}

function updateGame() {
  const updateData = { score: game.score }

  const configObj = {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(updateData)
  }

  fetch(`http://localhost:3000/games/${game.id}`, configObj)
  .then(resp => resp.json())
  .then(function(json) {
    clueToRender.answered = true;
    scoreDiv.innerText = "CURRENT SCORE: $" + game.score;
    answeredClues.push(clueToRender);
    discardState();
    container.appendChild(scoreDiv);
    gameContainer = document.createElement("div.game-container")
    counter += 1;
    gameContainer.id = `${counter}`
    container.appendChild(gameContainer);
    renderBoard(game)
  })
  .catch(error => console.log(error))
}

function discardState() {
  container.innerHTML = '<img id="logo" src="style_assets/Jeopardy!_logo.png">';
  container.appendChild(scoreDiv);
}

function persistData(category) {
  const categoryColumn = document.createElement("div");
  categoryColumn.className = "category-column"
  gameContainer.appendChild(categoryColumn)
  let categoryBubble = document.createElement("div");
  categoryBubble.className = "category-bubble";
  categoryBubble.id = `category-${category.id}`;
  categoryBubble.innerHTML = category.name;
  categoryColumn.appendChild(categoryBubble);

//RENDER EACH CLUE WITH DOLLAR VALUE AND ONCLICK EVENT LISTENER
  const clues = category.clues
  for (let i = 0; i < clues.length; i++) {
    clue = clues[i]
    let clueBubble = document.createElement("div");
    clueBubble.id = clue.id;
    clueBubble.className = "clue-bubble";
    if (!answeredClues.find(c => c.id === clue.id)) {
      clueBubble.innerHTML = "$" + clue.value;
    }
    categoryColumn.appendChild(clueBubble);
  }
  const allClueBubbles = document.querySelectorAll(".clue-bubble");
  for (let i = 0; i < allClueBubbles.length; i++) {
    let clueBubble = allClueBubbles[i];
    clueBubble.addEventListener("click", () => {
      gameContainer.remove()
      clueContainers = document.querySelectorAll(".clue-container");
      clueContainers.forEach(c => container.removeChild(c))
      renderClue(clueBubble.id);
      if(answeredClues.find(c => c.id === clueBubble.id)) {
        this.removeEventListener('click',arguments.callee,false);
      }
    })
  }
}
