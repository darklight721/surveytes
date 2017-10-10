class Admin::ResponsesController < ApplicationController
  def index
    responses = Response.where(survey_id: params[:survey_id])
    render json: {responses: responses}, status: :ok
  end
end
