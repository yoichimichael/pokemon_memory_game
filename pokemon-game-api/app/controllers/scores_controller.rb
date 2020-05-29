class ScoresController < ApplicationController
  def index
    scores = Score.all
    render json: scores, only: [:score, :user_id]
    # render json: users, except: [:created_at, :updated_at]
  end

  def create
      user = Score.create(score: params[:score], user_id: params[:user_id])
      render json: score, only: [:score, :user_id]
  end
end
