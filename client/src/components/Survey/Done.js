import React from 'react'
import { Redirect } from 'react-router-dom'

const Done = ({ location, match }) => {
  const { response } = location.state || {}

  if (!response)
    return <Redirect to={`/r/${match.params.linkCode}`} />

  return (
    <div>
      Done!
    </div>
  )
}

export default Done
