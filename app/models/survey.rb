class Survey < ApplicationRecord
  belongs_to :user

  has_many :responses

  validates :questions, :user, presence: true
  validates :link_code, uniqueness: true

  before_create :generate_link_code

  private

  def generate_link_code
    self.link_code = SecureRandom.uuid
  end
end
