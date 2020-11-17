require 'net/http'

Trip.destroy_all

puts "--- Downloading trips ---"
response = Net::HTTP.get_response('arrivalist-puzzles.s3.amazonaws.com', '/national_travel.json')

if response.is_a?(Net::HTTPSuccess)
  trips = JSON.parse(response.body)['data']

  puts "--- Import started (total #{trips.length} trips)---"

  trips.each_with_index do |params, index|
    trip = {
      'trip_date' => Date.parse(params['trip_date']),
      'home_state' => params['home_state'],
      'trip_count' => params['trip_count'],
    }

    puts "#{index+1} trips" if (index + 1) % 1000 == 0

    Trip.create(trip)
  end

  puts "--- Imported #{Trip.count} trips ---"
end
