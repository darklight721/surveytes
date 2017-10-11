import React from 'react'
import { Provider } from 'mobx-react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import Store from './Store'

import Header from './Header'
import Home from './Home'
import Login from './Login'
import Logout from './Logout'
import SignUp from './SignUp'
import Surveys from './Surveys'
import Survey from './Survey'

import RequireSessionRoute from './RequireSessionRoute'
import RequireNoSessionRoute from './RequireNoSessionRoute'

const store = new Store()

const App = () => (
  <Provider store={store}>
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <RequireNoSessionRoute path="/login" component={Login} />
          <RequireNoSessionRoute path="/signup" component={SignUp} />
          <RequireSessionRoute path="/logout" component={Logout} />
          <RequireSessionRoute path="/surveys" component={Surveys} />
          <Route path="/r" component={Survey} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  </Provider>
)

export default App
