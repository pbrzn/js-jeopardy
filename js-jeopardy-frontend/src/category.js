class Category {
  constructor(categoryObj) {
    this.id = categoryObj.id;
    this.name = categoryObj.name;
    this.clues = categoryObj.clues;
    Category.all.push(this)
  }

  static all = []

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
