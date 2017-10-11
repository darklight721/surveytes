import axios from 'axios'

export function getSurvey(linkCode) {
  return axios.get(`/api/surveys/${linkCode}`)
    .then(({ data }) => {
      const survey = {
        ...data.survey,
        questions: data.survey.questions ? JSON.parse(data.survey.questions) : []
      }
      return { data: { survey } }
    })
}

export function createResponse({ respondent_name, answers, survey_id }) {
  return axios.post(
    `/api/responses`,
    { response: { survey_id, respondent_name, answers: JSON.stringify(answers) } }
  )
}
