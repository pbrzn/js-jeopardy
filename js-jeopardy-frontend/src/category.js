class Category {
  constructor(id, name, clues) {
    this.id = id;
    this.name = name;
    this.clues = clues;
  }

  collectClueIds() {
    return this.clues.map(clue => clue.id)
  }

  // persistCategoryData() {
  //   const categoryColumn = document.createElement("div");
  //   categoryColumn.className = "category-column"
  //   gameContainer.appendChild(categoryColumn)
  //   let categoryBubble = document.createElement("div");
  //   categoryBubble.className = "category-bubble";
  //   categoryBubble.id = `category-${category.id}`;
  //   categoryBubble.innerHTML = category.name;
  //   categoryColumn.appendChild(categoryBubble);
  // }

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
