class Clue {
  constructor(id) {
    const clue = this;

    fetch(`http://localhost:3000/clues/${id}`)
    .then(resp => resp.json())
    .then(function(json) {
      clue.id = json.id;
      clue.value = json.value;
      clue.question = json.question;
      clue.answer = json.answer;
    })
  }

  static buildCluesFromCategory(category) {
    const clues = []
    const ids = category.clues.map(clue => clue.id)
    for (let i = 0; i < ids.length; i++) {
      const clue = new Clue(ids[i]);
      clues.push(clue)
    }
    return clues;
  }

}
