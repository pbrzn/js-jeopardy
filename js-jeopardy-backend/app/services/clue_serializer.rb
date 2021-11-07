class ClueSerializer
  def initialize(clue_object)
    @clue = clue_object
  end

  def to_serialized_json
    pp @clue.to_json(:include => {
      :category => {:only => :name}
      }, :except => [:created_at, :updated_at])
  end
end
