class GameSerializer
  def initialize(game_object)
    @game = game_object
  end

  def to_serialized_json
    pp @game.to_json(:include => {
      :categories => {:only => [:id, :name]},
      :clues => {:only => [:category_id, :value, :question, :answer]}
      }, :except => [:created_at, :updated_at])
  end
end
