FactoryBot.define do
  factory :trip do
    sequence(:trip_date) { |n| Date.parse('2020-11-01') + n.days }
    sequence(:home_state) { |n| n % 2 == 0 ? "AZ" : "NY" }
    sequence(:trip_count) { |n| n }
  end
end
