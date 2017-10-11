import React from 'react'
import { inject, observer } from 'mobx-react'
import { Link, NavLink } from 'react-router-dom'

const Header = ({ store }) => (
  <nav className="navbar navbar-expand-lg navbar-light">
    <Link to="/" className="navbar-brand">Surveytes</Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#headerNavBar">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="headerNavBar">
      <ul className="navbar-nav mr-auto">
        {store.isLoggedIn
          ?
            [
              <li key="surveys" className="nav-item">
                <NavLink to="/surveys" className="nav-link">My Surveys</NavLink>
              </li>,
              <li key="logout" className="nav-item">
                <NavLink to="/logout" className="nav-link">Log out</NavLink>
              </li>
            ]
          :
            [
              <li key="login" className="nav-item">
                <NavLink to="/login" className="nav-link">Log in</NavLink>
              </li>,
              <li key="signup" className="nav-item">
                <NavLink to="/signup" className="nav-link">Sign up</NavLink>
              </li>
            ]
        }
      </ul>
    </div>
  </nav>
)

export default inject('store')(observer(Header))
