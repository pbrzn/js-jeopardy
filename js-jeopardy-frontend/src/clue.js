class Clue {
  constructor(id, value, question, answer) {
    this.id = id;
    this.value = value;
    this.question = question;
    this.answer = answer;
    this.answered = false;
    this.answeredCorrectly = null;
  }

  // persistClueData() {
  //   const selectedClueBubble = document.createElement("div")
  //   selectedClueBubble.className = "bubble"
  //   selectedClueBubble.id = "selected-clue-bubble"
  //   discardState()
  //   container.appendChild(selectedClueBubble);
  //
  //   const questionDiv = document.createElement("div");
  //   questionDiv.id = "question";
  //   questionDiv.innerHTML = clueToRender.question;
  //   selectedClueBubble.appendChild(questionDiv);
  // }

  static findById(id) {
    return Clue.all.find(c => c.id === id)
  }


  // static buildCluesFromCategory(category) {
  //   const clues = []
  //   const ids = category.clues.map(clue => clue.id)
  //   for (let i = 0; i < ids.length; i++) {
  //     const clue = new Clue(ids[i]);
  //     clues.push(clue)
  //   }
  //   return clues;
  // }

}
