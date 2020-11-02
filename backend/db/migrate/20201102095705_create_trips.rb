class CreateTrips < ActiveRecord::Migration[6.0]
  def change
    create_table :trips do |t|
      t.datetime :trip_date, null: false, default: Time.now
      t.string :home_state, null: false, limit: 2
      t.integer :trip_count, default: 0
      t.timestamps
    end
  end
end
