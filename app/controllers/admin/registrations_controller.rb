class Admin::RegistrationsController < ApplicationController
  skip_before_action :authorize

  def create
    user = User.create(user_params)
    if user.valid?
      render json: {message: I18n.t('messages.registration_success')}, status: :ok
    else
      render json: {error: user.errors.full_messages.join(', ')}, status: :bad_request
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :username, :password)
  end

end
