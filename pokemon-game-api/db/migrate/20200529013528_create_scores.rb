class CreateScores < ActiveRecord::Migration[6.0]
  def change
    create_table :scores do |t|
      t.integer :score
      t.integer :user_id, foreign_key: true

      t.timestamps
    end
  end
end
