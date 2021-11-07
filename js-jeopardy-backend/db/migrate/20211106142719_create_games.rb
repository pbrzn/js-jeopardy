class CreateGames < ActiveRecord::Migration[6.1]
  def change
    create_table :games do |t|
      t.integer :score, default: 0
      t.string :username, default: "unknown"

      t.timestamps
    end
  end
end
