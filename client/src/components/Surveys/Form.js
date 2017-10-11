import React, { Component } from 'react'
import { inject } from 'mobx-react'
import { DEFAULT_QUESTIONS, MAX_CUSTOM_QUESTIONS } from '../../utils/questions'
import Alert from '../Alert'
import QuestionField from './QuestionField'
import { createSurvey } from './api'

class Form extends Component {
  state = {
    form: { name: '', questions: [] },
    isLoading: false,
    error: ''
  }

  render() {
    const { form, isLoading, error } = this.state

    return (
      <div className="container row">
        <div className="col-md-6">
          <h3>New Survey</h3>
          {error
            ? <Alert type="error" onClose={this.handleCloseError}>{error}</Alert>
            : null
          }
          <form onSubmit={this.handleSubmitForm}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                value={form.name}
                onChange={this.handleChangeName}
              />
            </div>
            <div className="form-group">
              <label>Questions</label>
              {DEFAULT_QUESTIONS.map((question, index) => (
                <div key={index} className="input-group mt-1">
                  <span className="input-group-addon">{index + 1}</span>
                  <input
                    readOnly
                    type="text"
                    className="form-control"
                    value={question}
                  />
                </div>
              ))}
              {form.questions.map((question, index) => (
                <QuestionField
                  index={index}
                  value={question}
                  onChange={this.handleChangeQuestion}
                  onRemove={this.handleRemoveQuestion}
                />
              ))}
              <button
                type="button"
                className="btn btn-default mt-1"
                disabled={form.questions.length >= MAX_CUSTOM_QUESTIONS}
                onClick={this.handleAddQuestion}
              >
                Add Custom Question
              </button>
            </div>
            <button type="submit" disabled={isLoading} className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    )
  }

  handleChangeName = e => this.setState({
    form: { ...this.state.form, name: e.currentTarget.value }
  })

  handleChangeQuestion = (index, value) => this.setState({
    form: {
      ...this.state.form,
      questions: this.state.form.questions.map((question, i) =>
        index === i ? value : question)
    }
  })

  handleRemoveQuestion = index => this.setState({
    form: {
      ...this.state.form,
      questions: this.state.form.questions.filter((question, i) => index !== i)
    }
  })

  handleAddQuestion = () => this.setState({
    form: { ...this.state.form, questions: [...this.state.form.questions, ''] }
  })

  handleCloseError = () => this.setState({ error: '' })

  handleSubmitForm = e => {
    e.preventDefault()

    const { store, history } = this.props
    let { name, questions } = this.state.form

    name = name.trim()
    questions = questions.map(q => q.trim()).filter(q => q)

    this.setState({ isLoading: true })

    createSurvey(store.authToken, {
      name,
      questions: [...DEFAULT_QUESTIONS, ...questions]
    })
      .then(({ data }) => history.replace({
        pathname: '/surveys/share',
        state: { survey: data.survey }
      }))
      .catch(error => this.setState({
        isLoading: false,
        error: error.response ? error.response.data.error : 'Error!'
      }))
  }
}

export default inject('store')(Form)
