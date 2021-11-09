class Clue {
  constructor(id, value, question, answer, answerCorrect = null) {
    this.id = id;
    this.value = value;
    this.question = question;
    this.answer = answer;
    this.answerCorrect = null;
  }

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
