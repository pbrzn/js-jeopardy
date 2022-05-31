class Game {
  constructor(gameObj) {
    this.id = gameObj.id;
    this.categories = gameObj.categories;
    this.clues = gameObj.clues;
    this.score = gameObj.score;
  }

  static all = [];

  static fetchAll() {
    return fetch("http://localhost:3000/games")
      .then(resp => resp.json())
      .then(json => {
        json.forEach(game => this.all.push(game));
      });
  }

  static highScores() {
    return this.all.sort((a, b) => b.score - a.score).slice(0,5);
  }

  renderHighScores() {
    const array = Game.highScores();

    const list = document.createElement("ol");
    list.className = "game-over-list";

    for (let i = 0; i < array.length; i++) {
      let li = document.createElement("li");
      li.innerHTML = `GAME ${array[i].id}: $${array[i].score}`
      list.appendChild(li);
    }

    return list;
  }

  renderCurrentScore() {
    const div = document.createElement("div");
    div.id = "score";
    div.innerText = "CURRENT SCORE: $" + this.score;
    return div;
  }

}
