import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Form from './Form'
import Done from './Done'

const Survey = ({ match }) => (
  <Switch>
    <Route exact path={`${match.url}/:linkCode`} component={Form} />
    <Route path={`${match.url}/:linkCode/done`} component={Done} />
    <Redirect to="/" />
  </Switch>
)

export default Survey
