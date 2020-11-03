require 'rails_helper'
require 'database_cleaner/active_record'

DatabaseCleaner.strategy = :truncation, {:only => %w[trips]}

start_date = Date.parse('2020-11-01') + 2.days
end_date = Date.parse('2020-11-01') + 3.days

RSpec.describe 'Trips', type: :request do
  before(:all) do
    (1..5).each { create(:trip) }
  end

  it 'get trips' do
    get '/api/trips/'
    expect(assigns(:trips).count).to eq(5)
  end

  it 'get trips filtered by state' do
    get '/api/trips/?state=AZ'
    expect(assigns(:trips).count).to eq(2)

    get '/api/trips/?state=NY'
    expect(assigns(:trips).count).to eq(3)

    get '/api/trips/?state=GA'
    expect(assigns(:trips).count).to eq(0)
  end

  it 'get trips filtered by dates' do
    get "/api/trips/?start=#{start_date}"
    expect(assigns(:trips).count).to eq(4)

    get "/api/trips/?end=#{end_date}"
    expect(assigns(:trips).count).to eq(2)
  end

  it 'get trips filtered by state and dates' do
    get "/api/trips/?state=AZ&start=#{start_date}"
    expect(assigns(:trips).count).to eq(2)

    get "/api/trips/?state=AZ&start=#{start_date}&end=#{end_date}"
    expect(assigns(:trips).count).to eq(1)
  end

  after(:all) do
    DatabaseCleaner.clean
  end
end
