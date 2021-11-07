class CategoriesController < ApplicationController
  def index
    categories = Category.all
    render json: CategorySerializer.new(categories).to_serialized_json
  end

  def show
    category = Category.find_by(id: params[:id])
    render json: CategorySerializer.new(category).to_serialized_json
  end
end
