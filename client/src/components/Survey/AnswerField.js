import React, { Component } from 'react'
import { DEFAULT_QUESTIONS } from '../../utils/questions'

const DEFAULT_QUESTIONS_COUNT = DEFAULT_QUESTIONS.length

class AnswerField extends Component {
  render() {
    const { question, value, index } = this.props

    return (
      <div className="form-group">
        <label>{index + 1}. {question}</label>
        <input
          type="text"
          className="form-control"
          value={value}
          onChange={this.handleChange}
        />
        {index >= DEFAULT_QUESTIONS_COUNT
          ?
            <small className="form-text text-muted">
              * This question was added by the administrator
            </small>
          : null
        }
      </div>
    )
  }

  handleChange = e => this.props.onChange(this.props.index, e.currentTarget.value)
}

export default AnswerField
