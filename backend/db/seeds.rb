require 'net/http'

Trip.destroy_all

response = Net::HTTP.get_response('arrivalist-puzzles.s3.amazonaws.com', '/national_travel.json')

if response.is_a?(Net::HTTPSuccess)
  trips = JSON.parse(response.body)['data']

  trips.each do |params|
    trip = {
      'trip_date' => Date.parse(params['trip_date']),
      'home_state' => params['home_state'],
      'trip_count' => params['trip_count'],
    }

    Trip.create(trip)
  end

  puts "Imported #{Trip.count} trips"
end
