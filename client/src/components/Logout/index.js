import React, { Component } from 'react'
import { inject } from 'mobx-react'

class Logout extends Component {
  componentWillMount() {
    this.props.store.setSession(null)
  }

  render() {
    return (
      <div className="container">
        <h3>Bye!</h3>
      </div>
    )
  }
}

export default inject('store')(Logout)
