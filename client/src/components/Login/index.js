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
      <div className="container row">
        <div className="col-md-6">
          <h3>Login</h3>
          {error
            ? <Alert type="error" onClose={this.handleCloseError}>{error}</Alert>
            : null
          }
          <form onSubmit={this.handleSubmitForm}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                value={form.username}
                onChange={this.handleChangeUsername}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                value={form.password}
                onChange={this.handleChangePassword}
              />
            </div>
            <button type="submit" disabled={isLoading} className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
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
