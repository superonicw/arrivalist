class TripSerializer < ActiveModel::Serializer
  attributes :id, :trip_date, :home_state, :trip_count
end
