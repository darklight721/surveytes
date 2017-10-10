class SurveysController < ApplicationController
  skip_before_action :authorize

  def show
    survey = Survey.find_by_link_code(params[:id])
    if survey
      render json: {survey: survey}, status: :ok
    else
      render json: {error: I18n.t('messages.survey_not_found')}, status: :not_found
    end
  end

end
