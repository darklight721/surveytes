import axios from 'axios'

export function createSurvey(authToken, { name, questions }) {
  const headers = { 'Authorization': `Bearer ${authToken}` }
  return axios.post(
    '/api/admin/surveys',
    { survey: { name, questions: JSON.stringify(questions) } },
    { headers }
  )
}

export function getSurveys(authToken) {
  const headers = { 'Authorization': `Bearer ${authToken}` }
  return axios.get('/api/admin/surveys', { headers })
    .then(({ data }) => {
      const surveys = data.surveys.map(survey => ({
        ...survey,
        questions: survey.questions ? JSON.parse(survey.questions) : []
      }))
      return { data: { surveys } }
    })
}

export function getResponses(authToken, surveyId) {
  const headers = { 'Authorization': `Bearer ${authToken}` }
  return axios.get(`/api/admin/responses?survey_id=${surveyId}`, { headers })
    .then(({ data }) => {
      const responses = data.responses.map(response => ({
        ...response,
        answers: response.answers ? JSON.parse(response.answers) : []
      }))
      return { data: { responses } }
    })
}
