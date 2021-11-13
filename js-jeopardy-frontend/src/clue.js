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
    return Clue.all.filter(clue => clue.answered === true)
  }

  renderClueBubble() {
    const div = document.createElement("div");
    div.id = this.id;
    div.className = "clue-bubble";
    if (!Clue.all.find(c => c.id === clue.id)) {
      clueBubble.innerHTML = "$" + clue.value;
    } else {
      clueBubble.innerHTML = ""
    }
    return div
  }
}
