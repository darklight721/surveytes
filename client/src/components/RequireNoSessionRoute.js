import React from 'react'
import { inject, observer } from 'mobx-react'
import { Route, Redirect } from 'react-router-dom'

const RequrieNoSessionRoute = ({ store, component: Component, ...routeProps }) => (
  <Route
    {...routeProps}
    render={props => (
      store.isLoggedIn
        ? <Redirect to="/" />
        : <Component {...props} />
    )}
  />
)

export default inject('store')(observer(RequrieNoSessionRoute))
