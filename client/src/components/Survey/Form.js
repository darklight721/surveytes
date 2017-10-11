import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Alert from '../Alert'
import AnswerField from './AnswerField'
import { getSurvey, createResponse } from './api'

class Form extends Component {
  state = {
    survey: null,
    isSurveyLoaded: false,
    form: { respondent_name: '', answers: [] },
    isLoading: false,
    error: ''
  }

  componentWillMount() {
    const { match } = this.props

    this.setState({ isLoading: true })

    getSurvey(match.params.linkCode)
      .then(({ data }) => this.setState({
        isLoading: false,
        isSurveyLoaded: true,
        survey: data.survey
      }))
      .catch(error => this.setState({
        isLoading: false,
        isSurveyLoaded: true
      }))
  }

  render() {
    const { survey, isSurveyLoaded, isLoading, form, error } = this.state

    if (isLoading && !isSurveyLoaded)
      return null

    if (isSurveyLoaded && !survey)
      return <Redirect to="/" />

    return (
      <div className="container row">
        <div className="col-md-6">
          <h3>Answer the survey</h3>
          {error
            ? <Alert type="error" onClose={this.handleCloseError}>{error}</Alert>
            : null
          }
          <form onSubmit={this.handleFormSubmit}>
            <legend>{survey.name}</legend>
            <div className="form-group">
              <label>Your Name</label>
              <input
                type="text"
                className="form-control"
                value={form.name}
                onChange={this.handleChangeName}
              />
            </div>
            {survey.questions.map((question, index) => (
              <AnswerField
                key={index}
                index={index}
                question={question}
                value={form.answers[index] || ''}
                onChange={this.handleChangeAnswer}
              />
            ))}
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              Submit
            </button>
          </form>
        </div>
      </div>
    )
  }

  handleCloseError = () => this.setState({ error: '' })

  handleChangeName = e => this.setState({
    form: { ...this.state.form, respondent_name: e.currentTarget.value }
  })

  handleChangeAnswer = (index, value) => {
    const { form } = this.state
    const answers = [...form.answers]
    answers[index] = value
    this.setState({ form: { ...form, answers } })
  }

  handleFormSubmit = e => {
    e.preventDefault()

    const { history, match } = this.props
    const { survey, form } = this.state
    let { respondent_name, answers } = form

    respondent_name = respondent_name.trim()
    answers = answers.map(a => a.trim())

    if (survey.questions.length !== answers.filter(a => a).length)
      return this.setState({ error: 'Please answer all questions!' })

    this.setState({ isLoading: true })

    createResponse({ respondent_name, answers, survey_id: survey.id })
      .then(({ data }) => history.replace({
        pathname: `${match.url}/done`,
        state: { response: data.response }
      }))
      .catch(error => this.setState({
        isLoading: false,
        error: error.response ? error.response.data.error : 'Error!'
      }))
  }
}

export default Form
