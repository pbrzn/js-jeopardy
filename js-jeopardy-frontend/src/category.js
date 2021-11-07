class Category {
  assignProperties(id) {
    const category = this;
    fetch(`http://localhost:3000/categories/${id}`)
    .then(resp => resp.json())
    .then(function(json) {
      category.id = json.id;
      category.name = json.name;
      category.clues = json.clues
    })
    return this;
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
        arr.push(Math.ceil(Math.random() * json.length))
        counter--;
      }
    })
    return arr;
  }

  static buildEnMasse(arrayOfIds) {
    const categories = []
    for (let i = 0; i < arrayOfIds.length; i++) {
      const category = new Category().assignProperties(arrayOfIds[i]);
      categories.push(category);
    }
    return categories
  }
}
