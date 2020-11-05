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

  it 'get trips filtered by states' do
    get '/api/trips/?states=AZ'
    expect(assigns(:trips).count).to eq(2)

    get '/api/trips/?states=AZ,NY'
    expect(assigns(:trips).count).to eq(5)

    get '/api/trips/?states=GA'
    expect(assigns(:trips).count).to eq(0)
  end

  it 'get trips filtered by dates' do
    get "/api/trips/?start=#{start_date}"
    expect(assigns(:trips).count).to eq(4)

    get "/api/trips/?end=#{end_date}"
    expect(assigns(:trips).count).to eq(2)
  end

  it 'get trips filtered by states and dates' do
    get "/api/trips/?states=AZ&start=#{start_date}"
    expect(assigns(:trips).count).to eq(2)

    get "/api/trips/?states=AZ&start=#{start_date}&end=#{end_date}"
    expect(assigns(:trips).count).to eq(1)
  end

  after(:all) do
    DatabaseCleaner.clean
  end
end
