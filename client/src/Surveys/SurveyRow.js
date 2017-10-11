import React, { Component } from 'react'
import { inject } from 'mobx-react'
import getSurveyLink from '../utils/getSurveyLink'
import { getResponses } from './api'

class SurveyRow extends Component {
  state = { responses: [], isLoading: false, isOpen: false }

  render() {
    const { survey } = this.props
    const { isOpen } = this.state

    return (
      <div>
        <div onClick={this.handleToggleResponses}>
          <div>
            {survey.name}
            (<a href={getSurveyLink(survey.link_code)}>Link</a>)
          </div>
          {survey.questions.map((question, index) => (
            <div key={index}>{question}</div>
          ))}
        </div>
        {isOpen ? this.renderResponses() : null}
      </div>
    )
  }

  renderResponses() {
    const { responses } = this.state

    return (
      <div>
        {responses.map(response => (
          <div key={response.id}>
            <div>{response.respondent_name}</div>
            {response.answers.map((answer, index) => (
              <div>{answer}</div>
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
