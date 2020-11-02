class Trip < ApplicationRecord
  validates :home_state, presence: true, length: { is: 2 }
  validates :trip_count, presence: true, numericality: { only_integer: true }
end
