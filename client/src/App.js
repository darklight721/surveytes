import React from 'react'
import { Provider } from 'mobx-react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import Store from './Store'

import Header from './components/Header'
import Home from './components/Home'
import Login from './components/Login'
import Logout from './components/Logout'
import SignUp from './components/SignUp'
import Surveys from './components/Surveys'
import Survey from './components/Survey'
import RequireSessionRoute from './components/RequireSessionRoute'
import RequireNoSessionRoute from './components/RequireNoSessionRoute'

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
