import React, { Component } from 'react'
import { inject } from 'mobx-react'
import { Link } from 'react-router-dom'
import SurveyRow from './SurveyRow'
import { getSurveys } from './api'

class List extends Component {
  state = { surveys: [], isLoading: false }

  componentWillMount() {
    this.setState({ isLoading: true })

    getSurveys(this.props.store.authToken)
      .then(({ data }) => this.setState({
        isLoading: false,
        surveys: data.surveys
      }))
  }

  render() {
    const { surveys } = this.state

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="float-right">
              <Link to="/surveys/new" className="btn btn-primary btn-sm">New Survey</Link>
            </div>
            <h3>Surveys</h3>
          </div>
        </div>
        {surveys.map(survey => (
          <SurveyRow key={survey.id} survey={survey} />
        ))}
      </div>
    )
  }
}

export default inject('store')(List)
