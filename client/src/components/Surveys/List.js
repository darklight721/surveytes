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
      <div>
        <p>List</p>
        <Link to="/surveys/new">New Survey</Link>
        <ul>
          {surveys.map(survey => (
            <li key={survey.id}>
              <SurveyRow survey={survey} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default inject('store')(List)
