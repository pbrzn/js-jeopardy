class Category {
  constructor(id, name, clues) {
    this.id = id;
    this.name = name;
    this.clues = clues;
  }

  collectClueIds() {
    return this.clues.map(clue => clue.id)
  }

  static arrayOfIds() {
    const arr = []
    fetch("http://localhost:3000/categories")
    .then(resp => resp.json())
    .then(function(json) {
      let counter = 6
      while (counter > 0) {
        let num = Math.ceil(Math.random() * json.length)
        if (!arr.includes(num)) {
          arr.push(num)
          counter--;
        }
      }
    })
    return arr;
  }
}
