class Admin::SessionsController < ApplicationController
  skip_before_action :authorize

  def create
    user = User.find_by_username(params[:username])

    if user && user.authenticate(params[:password])
      token = JsonWebToken.encode({'user_id' => user.id})
      render json: {user: user, token: token}, status: :ok
    else
      render json: {error: I18n.t('messages.login_fail')}, status: :unauthorized
    end
  end
end
