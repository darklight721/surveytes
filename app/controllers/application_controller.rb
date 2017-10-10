class ApplicationController < ActionController::API
  before_action :authorize

  def authorize
    render json: {error: I18n.t('messages.unauthorized')}, status: :unauthorized unless logged_in?
  end

  def logged_in?
    current_user.present?
  end

  def current_user
    @current_user ||= User.find(auth_token['user_id']) if auth_token.present?
  end

  private

  def auth_token
    @auth_token ||= JsonWebToken.decode(http_token) if http_token.present?
  end

  def http_token
    @http_token ||= if request.headers['Authorization'].present?
      request.headers['Authorization'].split(' ').last
    end
  end

end
