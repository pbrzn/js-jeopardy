class Category {
  constructor(id, name, clues) {
    this.id = id;
    this.name = name;
    this.clues = clues;
  }

  static fetchCategoryInfo(id) {
    let categoryObj = {}
    fetch(`http://localhost:3000/categories/${id}`)
    .then(resp => resp.json())
    .then(function(json) {
      Object.assign(categoryObj, { id: json.id, name: json.name, clues: json.clues })
    })
    return categoryObj
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

  static buildEnMasse(arrayOfIds) {
    const categories = []
    for (let i = 0; i < arrayOfIds.length; i++) {
      const categoryObj = Category.fetchCategoryInfo(arrayOfIds[i]);
      console.log(categoryObj)
      const category = new Category(categoryObj.id, categoryObj.name, categoryObj.clues);
      categories.push(category);
    }
    return categories
  }
}
