class TripsController < ApplicationController
  def index
    @trips = trips
    render json: @trips
  end

  def trips
    list = Trip.all
    list = list.where(home_state: params[:state]) if params[:state].present?
    list = list.where('trip_date >= ?', params[:start]) if params[:start].present?
    list = list.where('trip_date <= ?', params[:end]) if params[:end].present?
    list
  end
end
