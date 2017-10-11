import React from 'react'
import { inject, observer } from 'mobx-react'
import { Link, NavLink } from 'react-router-dom'

const Header = ({ store }) => (
  <div>
    <Link to="/"><h1>Surveytes</h1></Link>
    <nav>
      {store.isLoggedIn
        ?
          [
            <NavLink key="surveys" to="/surveys">Surveys</NavLink>,
            <NavLink key="logout" to="/logout">Log out</NavLink>
          ]
        :
          [
            <NavLink key="login" to="/login">Log in</NavLink>,
            <NavLink key="signup" to="/signup">Sign up</NavLink>
          ]
      }
    </nav>
  </div>
)

export default inject('store')(observer(Header))
