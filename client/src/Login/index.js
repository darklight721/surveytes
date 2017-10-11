import React, { Component } from 'react'
import { inject } from 'mobx-react'
import Alert from '../Alert'
import { createSession } from './api'

class Login extends Component {
  state = {
    form: { username: '', password: '' },
    isLoading: false,
    error: ''
  }

  render() {
    const { form, isLoading, error } = this.state

    return (
      <div>
        <p>Login</p>
        {error
          ? <Alert type="error" onClose={this.handleCloseError}>{error}</Alert>
          : null
        }
        <form onSubmit={this.handleSubmitForm}>
          <div>
            <label>Username</label>
            <input
              type="text"
              value={form.username}
              onChange={this.handleChangeUsername}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={form.password}
              onChange={this.handleChangePassword}
            />
          </div>
          <button type="submit" disabled={isLoading}>Login</button>
        </form>
      </div>
    )
  }

  handleChangeUsername = e => this.setState({
    form: { ...this.state.form, username: e.currentTarget.value }
  })

  handleChangePassword = e => this.setState({
    form: { ...this.state.form, password: e.currentTarget.value }
  })

  handleCloseError = () => this.setState({ error: '' })

  handleSubmitForm = e => {
    e.preventDefault()

    const { username, password } = this.state.form
    const { store, history, location } = this.props

    this.setState({ isLoading: true })

    createSession({ username: username.trim(), password: password.trim() })
      .then(({ data }) => {
        store.setSession(data)
        history.push((location.state || {}).from || '/')
      })
      .catch(error => this.setState({
        isLoading: false,
        error: error.response ? error.response.data.error : 'Error!'
      }))
  }
}

export default inject('store')(Login)
