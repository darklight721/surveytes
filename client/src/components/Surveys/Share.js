import React from 'react'
import { Redirect } from 'react-router-dom'
import getSurveyLink from '../../utils/getSurveyLink'

const Share = ({ location }) => {
  const { survey } = location.state || {}

  if (!survey)
    return <Redirect to="/surveys/new" />

  return (
    <div>
      <p>Share your survey!</p>
      <div>
        <div>{survey.name}</div>
        <div>Link: <span>{getSurveyLink(survey.link_code)}</span></div>
      </div>
    </div>
  )
}

export default Share
