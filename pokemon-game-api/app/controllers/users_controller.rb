class UsersController < ApplicationController
    def index
        users = User.all
        render json: users, only: [:id, :username]
        # render json: users, except: [:created_at, :updated_at]
    end

    def create
        user = User.create(username: params[:username])
        render json: user, only: [:id, :username]
    end

end
