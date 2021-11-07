class Game {
  constructor(categoryIds, username = "Unknown Player") {
    const data = Object.assign({}, { category_ids: categoryIds, username: username})

    const configObject = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
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

  categoryNames() {
    this.categories.map(category => category.name)
  }
}
