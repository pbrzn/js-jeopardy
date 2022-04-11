class Category {
  constructor(categoryObj) {
    this.id = categoryObj.id;
    this.name = categoryObj.name;
    this.clues = categoryObj.clues;
    Category.all.push(this)
  }

  static all = [];

  renderCategoryColumn() {
    const div = document.createElement("div");
    div.className = "category-column";
    div.id = this.id
    return div
  }

  renderCategoryBubble() {
    const div = document.createElement("div");
    div.className = "category-bubble";
    div.id = this.id;
    div.innerHTML = this.name;
    return div
  }

  renderClueBubbles() {
    const clueBubble = document.createElement("div");
    clueBubble.id = this.id;
    clueBubble.className = "clue-bubble";
    if (!Clue.answeredClues().find(c => c.id === this.id)) {
      clueBubble.innerHTML = "$" + this.value;
    } else {
      clueBubble.innerHTML = ""
    }
  }
}
