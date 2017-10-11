import React, { Component } from 'react'
import { inject } from 'mobx-react'

class Logout extends Component {
  componentWillMount() {
    this.props.store.setSession(null)
  }

  render() {
    return (
      <div>Bye!</div>
    )
  }
}

export default inject('store')(Logout)
