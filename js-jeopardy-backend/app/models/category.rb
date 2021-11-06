class Category < ApplicationRecord
  has_many :game_categories
  has_many :games, through: :game_categories
  has_many :clues
end
