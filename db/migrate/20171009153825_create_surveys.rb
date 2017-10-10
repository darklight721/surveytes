class CreateSurveys < ActiveRecord::Migration[5.1]
  def change
    create_table :surveys do |t|
      t.string :name
      t.text :questions
      t.text :link_code, index: true
      t.belongs_to :user, foreign_key: true

      t.timestamps
    end
  end
end
