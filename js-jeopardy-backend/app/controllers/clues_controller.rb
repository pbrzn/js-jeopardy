class CluesController < ApplicationController
  def index
    clues = Clue.all
    render json: ClueSerializer.new(clues).to_serialized_json
  end

  def show
    clue = Clue.find_by(id: params[:id])
    render json: ClueSerializer.new(clue).to_serialized_json
  end
end
