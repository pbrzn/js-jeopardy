//GLOBAL VARIABLES
let game;
let clue;
let category;
let clueToRender;
let categoryIdArray = Category.arrayOfIds();

const container = document.getElementById("container")
const masterBubble = document.createElement("div");
masterBubble.className = "bubble";
masterBubble.id = "master-bubble";

//START MENU ON DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  container.appendChild(masterBubble)
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
})

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
  const score = gameObj.score;
  const categories = gameObj.categories;
  const scoreDiv = document.createElement("div");
  scoreDiv.className = "score";
  scoreDiv.innerText = "CURRENT SCORE: $" + score;
  container.appendChild(scoreDiv);
  renderBoard(categories);
}

function renderBoard(categoriesArray) {
  const gameContainer = document.createElement("div.game-container");
  container.appendChild(gameContainer)

  //RENDER ALL CATEGORIES WITH COLUMNS FOR THAT EACH CATEGORY'S CLUES
  for (let i = 0; i < categoriesArray.length; i++) {
    fetch(`http://localhost:3000/categories/${categoriesArray[i].id}`)
    .then(resp => resp.json())
    .then(function(json) {
      category = new Category(json.id, json.name, json.clues)
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
        clueBubble.innerHTML = "$" + clue.value;
        categoryColumn.appendChild(clueBubble);
      }
      const allClueBubbles = document.querySelectorAll(".clue-bubble");
      console.log(allClueBubbles)
      allClueBubbles.forEach((clueBubble, i) => {
        clueBubble.addEventListener("click", () => {
          container.removeChild(gameContainer)
          clueContainers = document.querySelectorAll(".clue-container");
          clueContainers.forEach(c => container.removeChild(c))
          renderClue(clueBubble.id);
        })
      })
    });
  }
}


//ONCE A CLUE IS CLICKED ON IT WILL RENDER THAT CLUE'S QUESTION
//AND A TEXT INPUT BAR IN THE MASTER BUBBLE
function renderClue(clueId) {
  console.log(clueId)
  fetch(`http://localhost:3000/clues/${clueId}`)
  .then(resp => resp.json())
  .then(function(json) {
    clueToRender = new Clue(json.id, json.value, json.question, json.answer);

    container.appendChild(masterBubble);
    masterBubble.removeChild(document.querySelector("div#welcome.bubble-text"))
    const questionDiv = document.createElement("div");
    questionDiv.className = "question";
    questionDiv.innerHTML = clueToRender.question;
    masterBubble.appendChild(questionDiv);

    const answerDiv = document.createElement("div");
    answerDiv.id = "form-container";
    masterBubble.appendChild(answerDiv);
    const answerForm = document.createElement("form");
    answerForm.id = "answer";
    answerDiv.appendChild(answerForm);
    const answerLabel = document.createElement("label#answer-input")
    const answerInput = document.createElement("input#answer-input")
    answerLabel.innerText = "What is...?"

  })
  .catch(error => console.log(error))
}
