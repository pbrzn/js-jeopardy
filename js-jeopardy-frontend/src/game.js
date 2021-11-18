class Game {
  constructor(gameObj) {
    this.id = gameObj.id;
    this.categories = gameObj.categories;
    this.clues = gameObj.clues;
    this.score = gameObj.score;
    // Game.all.push(this)
  }

  static all = [];

  static fetchAll() {

    return fetch("http://localhost:3000/games")
      .then(resp => resp.json())
      .then(json => {
        json.forEach(game => this.all.push(game))
      })
  }

  static highScores() {
    return this.all.filter(game => game.score > 10000).sort((a, b) => b > a);
  }

  renderHighScores() {
    const array = Game.highScores();

    const list = document.createElement("ol")
    list.className = "game-over-list"

    for (let i = 0; i < 5; i++) {
      let li = document.createElement("li");
      li.innerHTML = `GAME ${array[i].id}: $${array[i].score}`
      list.appendChild(li);
    }

    return list
  }

}
