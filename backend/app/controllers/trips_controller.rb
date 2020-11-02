class TripsController < ApplicationController
  def index
    render json: trips
  end

  def trips
    if not params[:state].present? and not params[:date].present?
      list = Trip.none
    else
      list = Trip.all
      list = list.where(home_state: params[:state]) if params[:state].present?
      list
    end
  end
end
