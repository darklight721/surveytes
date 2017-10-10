class ResponsesController < ApplicationController
  skip_before_action :authorize

  def create
    response = Response.create(response_params)
    if response.valid?
      render json: {response: response}, status: :ok
    else
      render json: {error: response.errors.full_messages.join(', ')}, status: :bad_request
    end
  end

  private

  def response_params
    params.require(:response).permit(:respondent_name, :answers, :survey_id)
  end
end
