import React from 'react'
import { inject, observer } from 'mobx-react'
import { Route, Redirect } from 'react-router-dom'

const RequireSessionRoute = ({ store, component: Component, ...routeProps }) => (
  <Route
    {...routeProps}
    render={props => (
      store.isLoggedIn
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )}
  />
)

export default inject('store')(observer(RequireSessionRoute))
