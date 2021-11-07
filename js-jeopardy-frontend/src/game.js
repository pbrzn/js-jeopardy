class Game {
  constructor() {
    const categoryIds = Category.arrayOfIds();

    const categories = Category.buildEnMasse(categoryIds);

    const configObject = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      }
    }

    const game = this;

    fetch("http://localhost:3000/games", configObject)
      .then(resp => resp.json())
      .then(function(json) {
        game.id = json.id;
        game.categories = json.categories;
        game.clues = json.clues;
        game.score = json.score;
        game.username = json.username;
      })
  }
}
