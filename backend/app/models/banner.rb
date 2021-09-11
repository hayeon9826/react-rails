class Banner < ApplicationRecord
  include ImageUrl
  enum status: { active: 0, disabled: 1}
  enum banner_type: { main: 0, small: 1, advertise: 2 }

  validates :image, presence: true

end
