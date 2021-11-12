class Game {
  constructor(gameObj) {
    this.id = gameObj.id;
    this.categories = gameObj.categories;
    this.clues = gameObj.clues;
    this.score = gameObj.score;
    Game.all.push(this)
  }

  static all = [];
}
