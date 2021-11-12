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
}
