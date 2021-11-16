class Clue {
  constructor(clueObj) {
    this.id = clueObj.id;
    this.value = clueObj.value;
    this.question = clueObj.question;
    this.answer = clueObj.answer;
  }

  static all = [];

  answered = false;
  answeredCorrectly = null;

  static answeredClues() {
    return this.all.filter(clue => clue.answered === true)
  }

  static clearAnsweredClues() {
    if (this.answeredClues().length === 30) {
      this.answeredClues().forEach(clue => clue.answered = false);
    }
    return this.answeredClues()
  }

  render() {
    const div = document.createElement("div")
    div.className = "bubble"
    div.id = "selected-clue-bubble"

    const questionDiv = document.createElement("div");
    questionDiv.className = "question";
    questionDiv.innerHTML = this.question;
    div.appendChild(questionDiv);

    const answerForm = document.createElement("form");
    answerForm.className = "answer";
    div.appendChild(answerForm);

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

    return div;
  }
}
