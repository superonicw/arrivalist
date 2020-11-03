require 'rails_helper'

RSpec.describe Trip, type: :model do
  subject { 
    described_class.new(trip_date: '2020-11-01',
                        home_state: 'AZ',
                        trip_count: 100)
  }
  
  it "is valid with valid attributes" do
    expect(subject).to be_valid
  end

  it "is not valid with invalid trip_date" do
    subject.trip_date = nil
    expect(subject).to_not be_valid
  end

  it "is not valid with invalid home_state" do
    subject.home_state = nil
    expect(subject).to_not be_valid

    subject.home_state = 'Arizona'
    expect(subject).to_not be_valid
  end

  it "is not valid with invalid trip_count" do
    subject.trip_count = nil
    expect(subject).to_not be_valid

    subject.trip_count = 3.5
    expect(subject).to_not be_valid
  end
end
