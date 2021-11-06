class CreateClues < ActiveRecord::Migration[6.1]
  def change
    create_table :clues do |t|
      t.integer :category_id
      t.integer :value
      t.string :question
      t.string :answer

      t.timestamps
    end
  end
end
