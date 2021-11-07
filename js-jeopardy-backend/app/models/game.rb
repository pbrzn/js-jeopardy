class Game < ApplicationRecord
  has_many :game_categories
  has_many :categories, through: :game_categories
  has_many :clues, through: :categories
end
