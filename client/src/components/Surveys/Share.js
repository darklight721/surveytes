import React from 'react'
import { Redirect } from 'react-router-dom'
import getSurveyLink from '../../utils/getSurveyLink'

const Share = ({ location }) => {
  const { survey } = location.state || {}

  if (!survey)
    return <Redirect to="/surveys/new" />

  return (
    <div className="jumbotron">
      <h1 className="display-3">Done!</h1>
      <p className="lead">Now share your survey!</p>
      <p className="lead">
        <label>{survey.name}</label>
        <input
          readOnly
          type="text"
          className="form-control form-control-lg"
          value={getSurveyLink(survey.link_code)}
        />
      </p>
    </div>
  )
}

export default Share
