class TripsController < ApplicationController
  def index
    render json: trips
  end

  def trips
    list = Trip.all
    list = list.where(home_state: params[:state]) if params[:state].present?
    list
  end
end
