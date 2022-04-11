class GamesController < ApplicationController
  def index
    games = Game.all
    render json: GameSerializer.new(games).to_serialized_json
  end

  def show
    game = Game.find_by(id: params[:id])
    render json: GameSerializer.new(game).to_serialized_json
  end

  def create
    game = Game.new
    game.add_categories
    game.save
    render json: GameSerializer.new(game).to_serialized_json
  end

  def update
    game = Game.find_by(id: params[:id])
    game.update(score: params[:score])
    render json: GameSerializer.new(game).to_serialized_json
  end
end
