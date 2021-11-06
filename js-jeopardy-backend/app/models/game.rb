class Game < ApplicationRecord
  has_many :game_categories
  has_many :categories, through: :game_categories

  def add_categories
    num = (1..Category.all.length).to_a.shuffle
    i = 0
    while i < 6
      self.categories << Category.find(num[i])
      i += 1
    end
  end
end
