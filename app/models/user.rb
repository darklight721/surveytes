class User < ApplicationRecord
  has_secure_password

  has_many :surveys

  validates :username, presence: true, uniqueness: true
  validates :password, length: {in: 6..20}

  def as_json(options={})
    super({except: [:password_digest]}.merge(options))
  end

end
