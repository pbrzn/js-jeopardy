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

  renderCategoryColumn() {
    const div = document.createElement("div");
    div.className = "category-column";
    return div
  }

  renderCategoryBubble() {
    const div = document.createElement("div");
    div.className = "category-bubble";
    div.id = this.id;
    div.innerHTML = this.name;
    return div
  }
}
