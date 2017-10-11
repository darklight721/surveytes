import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import List from './List'
import Form from './Form'
import Share from './Share'

const Surveys = ({ match }) => (
  <Switch>
    <Route exact path={match.url} component={List} />
    <Route path={`${match.url}/new`} component={Form} />
    <Route path={`${match.url}/share`} component={Share} />
    <Redirect to="/" />
  </Switch>
)

export default Surveys
