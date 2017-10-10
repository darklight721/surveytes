class Admin::SurveysController < ApplicationController
  def index
    render json: {surveys: current_user.surveys}, status: :ok
  end

  def create
    survey = current_user.surveys.create(survey_params)
    if survey.valid?
      render json: {survey: survey}, status: :ok
    else
      render json: {error: survey.errors.full_messages.join(', ')}, status: :bad_request
    end
  end

  private

  def survey_params
    params.require(:survey).permit(:name, :questions)
  end
end
