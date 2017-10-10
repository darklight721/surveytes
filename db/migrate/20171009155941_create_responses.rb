class CreateResponses < ActiveRecord::Migration[5.1]
  def change
    create_table :responses do |t|
      t.string :respondent_name
      t.text :answers
      t.belongs_to :survey, foreign_key: true

      t.timestamps
    end
  end
end
