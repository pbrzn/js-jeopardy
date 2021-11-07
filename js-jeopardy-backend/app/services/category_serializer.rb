class CategorySerializer

  def initialize(category_object)
    @category = category_object
  end

  def to_serialized_json
    pp @category.to_json(:include => {
      :clues => {:only => [:id, :value, :question, :answer]}
      }, :except => [:created_at, :updated_at])
  end

end
