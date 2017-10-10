class Response < ApplicationRecord
  belongs_to :survey

  validates :answers, :survey, presence: true
end
