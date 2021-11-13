//GLOBAL VARIABLES
let game;
let clueToRender;
let categoryIdArray = Category.arrayOfIds();
let scoreDiv;

const container = document.getElementById("container")

//START MENU ON DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  const start = document.getElementById("start")

  start.addEventListener("click", startGame, false)
})

function startGame() {
  if (Clue.answeredClues() === 30) {
    Clue.answeredClues().forEach( clue => clue.answered = false);
  }

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
    game = new Game(json)
    discardState()
    renderBoard(game);
  })
}

function gameOverWannaPlayAgain() {
  const gameOverDiv = document.createElement("div");
  gameOverDiv.className = "bubble";
  gameOverDiv.id = "game-over";
  container.appendChild(gameOverDiv);

  const p3 = document.createElement("p");
  p3.className = "game-over-text"
  p3.innerHTML = "THE GAME IS OVER! \nYOUR FINAL SCORE IS: \n$" + game.score;
  gameOverDiv.appendChild(p3)

  const p4 = document.createElement("p");
  p4.className = "game-over-text"
  p4.id = "play-again"
  p4.innerHTML = "<u>CLICK HERE TO PLAY AGAIN</u>"
  gameOverDiv.appendChild(p4)
  p4.addEventListener("click", startGame, false)
}
//
// function parseGameObject(gameObj) {
//   const categoryObjects = gameObj.categories;
//   for (let i = 0; i < categoryObjects.length; i++) {
//     fetch(`http://localhost:3000/categories/${categoryObjects[i].id}`)
//     .then(resp => resp.json())
//     .then(function(json) {
//       let category = new Category(json);
//       // persistData(category)
//     });
//   }
// }


function renderBoard(gameObj) {
  const categories = gameObj.categories;
  scoreDiv = document.createElement("div");
  scoreDiv.id = "score";
  scoreDiv.innerText = "CURRENT SCORE: $" + gameObj.score
  container.appendChild(scoreDiv)

  for (let i = 0; i < categories.length; i++) {
    let category = Category.all.find((c) => c.id === parseInt(categories[i].id), 10)
    if (!!category) {
    persistData(category)
    } else {
      fetch(`http://localhost:3000/categories/${categories[i].id}`)
      .then(resp => resp.json())
      .then(function(json) {
        let category = new Category(json);
        persistData(category)
      });
    }
  }
}


function renderClue(clueId) {
  if (!Clue.all.find(c => c.id === clueId)) {
    fetch(`http://localhost:3000/clues/${clueId}`)
    .then(resp => resp.json())
    .then(function(json) {
      clueToRender = new Clue(json);

      const selectedClueBubble = document.createElement("div")
      selectedClueBubble.className = "bubble"
      selectedClueBubble.id = "selected-clue-bubble"
      discardState()
      container.appendChild(scoreDiv);
      container.appendChild(selectedClueBubble);

      const questionDiv = document.createElement("div");
      questionDiv.className = "question";
      questionDiv.innerHTML = clueToRender.question;
      selectedClueBubble.appendChild(questionDiv);

      const answerForm = document.createElement("form");
      answerForm.className = "answer";
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
        if (answerInput.value !== "" && answerInput.value !== "?" && answerInput.value.length > 1 && clueToRender.answer.includes(answerInput.value.toUpperCase())) {
          clueToRender.answeredCorrectly = true;
          game.score += clueToRender.value
          updateGame()
        } else {
          clueToRender.answeredCorrectly = false;
          game.score -= clueToRender.value
          updateGame()
        }
      })

    })
    .catch(error => console.log(error))
  }
}

function updateGame() {
  let answerStatus = document.createElement("div");
  answerStatus.className = "answer-status"
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
    if (clueToRender.answeredCorrectly === true) {
      answerStatus.innerHTML = "CORRECT!"
    } else if (clueToRender.answeredCorrectly === false) {
      answerStatus.innerHTML = `SORRY, THE CORRECT ANSWER IS: \"${clueToRender.answer}\"`
    }
    container.appendChild(answerStatus)
    scoreDiv.innerText = "CURRENT SCORE: $" + game.score;
    Clue.all.push(clueToRender);
    discardState();
    if (Clue.answeredClues().length === 30){
      container.appendChild(answerStatus)
      gameOverWannaPlayAgain();
    } else {
      container.appendChild(answerStatus);
      renderBoard(game);
    }
  })
  .catch(error => console.log(error))
}

function discardState() {
  container.innerHTML = '<img id="logo" src="style_assets/Jeopardy!_logo.png">';
}

function persistData(category) {
  const categoryColumn = category.renderCategoryColumn();
  container.appendChild(categoryColumn);
  categoryColumn.appendChild(category.renderCategoryBubble());

  const clues = category.clues
  for (let i = 0; i < clues.length; i++) {
    const clue = clues[i]
    let clueBubble = document.createElement("div");
    clueBubble.id = clue.id;
    clueBubble.className = "clue-bubble";
    if (!Clue.answeredClues().find(c => c.id === clue.id)) {
      clueBubble.innerHTML = "$" + clue.value;
    } else {
      clueBubble.innerHTML = ""
    }
    categoryColumn.appendChild(clueBubble);
    clueBubble.addEventListener("click", function handler(e) {
      if(!!Clue.answeredClues().find(c => c.id === parseInt((clue.id), 10))) {
        clueBubble.removeEventListener("click", handler, false);
      } else {
        discardState();
        renderClue(clueBubble.id);
      }
    })
  }
}
