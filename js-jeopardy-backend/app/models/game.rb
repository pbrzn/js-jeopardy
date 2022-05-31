class Game < ApplicationRecord
  has_many :game_categories
  has_many :categories, through: :game_categories
  has_many :clues, through: :categories

  def add_categories
    nums = (1..Category.all.length).to_a.shuffle[0..5]
    nums.each {|num| self.categories << Category.all.find(num) }
  end
end
