import React from 'react'
import { Redirect } from 'react-router-dom'

const Done = ({ location, match }) => {
  const { response } = location.state || {}

  if (!response)
    return <Redirect to={`/r/${match.params.linkCode}`} />

  return (
    <div className="jumbotron">
      <h1 className="display-3">Thanks!</h1>
      <p className="lead">Your response has been saved!</p>
    </div>
  )
}

export default Done
