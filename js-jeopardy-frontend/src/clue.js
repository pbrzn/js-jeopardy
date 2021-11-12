class Clue {
  constructor(id, value, question, answer) {
    this.id = id;
    this.value = value;
    this.question = question;
    this.answer = answer;
  }

  static all = [];

  answered = false;
  answeredCorrectly = null;

  static answeredClues() {
    return Clue.filter(clue => clue.answered === true)
  }

  // renderClueBubble() {
  //   const div = document.createElement("div");
  //   div.id = this.id;
  //   div.className = "clue-bubble";
  //   if (!Clue.all.find(c => c.id === clue.id)) {
  //     clueBubble.innerHTML = "$" + clue.value;
  //   } else {
  //     clueBubble.innerHTML = ""
  //   }
  //   return div
  // }
}
