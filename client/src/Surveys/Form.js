import React, { Component } from 'react'
import { inject } from 'mobx-react'
import Alert from '../Alert'
import QuestionField from './QuestionField'
import { createSurvey } from './api'

const MAX_CUSTOM_QUESTIONS = 2

const DEFAULT_QUESTIONS = [
  'What is your favorite book?',
  'Who is your favorite band?',
  'What is your favorite food?'
]

class Form extends Component {
  state = {
    form: { name: '', questions: [] },
    isLoading: false,
    error: ''
  }

  render() {
    const { form, isLoading, error } = this.state

    return (
      <div>
        <p>New Survey</p>
        {error
          ? <Alert type="error" onClose={this.handleCloseError}>{error}</Alert>
          : null
        }
        <form onSubmit={this.handleSubmitForm}>
          <div>
            <label>Name</label>
            <input
              type="text"
              value={form.name}
              onChange={this.handleChangeName}
            />
          </div>
          <div>
            <label>Questions</label>
            <ol>
              {DEFAULT_QUESTIONS.map((question, index) => (
                <li key={index}>
                  <input readOnly type="text" value={question} />
                </li>
              ))}
              {form.questions.map((question, index) => (
                <li key={index}>
                  <QuestionField
                    index={index}
                    value={question}
                    onChange={this.handleChangeQuestion}
                    onRemove={this.handleRemoveQuestion}
                  />
                </li>
              ))}
            </ol>
            <button
              type="button"
              disabled={form.questions.length >= MAX_CUSTOM_QUESTIONS}
              onClick={this.handleAddQuestion}
            >
              Add
            </button>
          </div>
          <button type="submit" disabled={isLoading}>Submit</button>
        </form>
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
