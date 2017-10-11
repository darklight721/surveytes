import React, { Component } from 'react'
import { inject } from 'mobx-react'
import getSurveyLink from '../../utils/getSurveyLink'
import { getResponses } from './api'
import './surveyrow.css'

class SurveyRow extends Component {
  state = { responses: [], isLoading: false, isOpen: false }

  render() {
    const { survey } = this.props
    const { isOpen } = this.state

    return (
      <div className="survey-row card mt-1">
        <div className="card-header" onClick={this.handleToggleResponses}>
          <div className="row">
            <div className="col">
              {survey.name}{' '}
              (<a href={getSurveyLink(survey.link_code)}>Link</a>)
            </div>
            {survey.questions.map((question, index) => (
              <div key={index} className="col">{question}</div>
            ))}
          </div>
        </div>
        {isOpen ? this.renderResponses() : null}
      </div>
    )
  }

  renderResponses() {
    const { responses } = this.state

    return (
      <div className="card-body">
        <h6 className="card-title">Responses: {responses.length}</h6>
        {responses.map((response, index) => (
          <div key={response.id} className="row">
            <div className="col">
              {index + 1}. {response.respondent_name}
            </div>
            {response.answers.map((answer, index) => (
              <div key={index} className="col">{answer}</div>
            ))}
          </div>
        ))}
      </div>
    )
  }

  handleToggleResponses = () => {
    const { responses, isOpen } = this.state
    const { store, survey } = this.props

    this.setState({ isOpen: !isOpen })

    if (!isOpen && responses.length === 0) {
      this.setState({ isLoading: true })
      getResponses(store.authToken, survey.id)
        .then(({ data }) => this.setState({
          isLoading: false,
          responses: data.responses
        }))
    }
  }
}

export default inject('store')(SurveyRow)
