class Trip < ApplicationRecord
  validates :trip_date, presence: true
  validates :home_state, presence: true, length: { is: 2 }
  validates :trip_count, presence: true, numericality: { only_integer: true }
end
