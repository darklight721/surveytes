import React, { Component } from 'react'
import { DEFAULT_QUESTIONS } from '../../utils/questions'

const OFFSET = DEFAULT_QUESTIONS.length + 1

class QuestionField extends Component {
  render() {
    const { value, index } = this.props

    return (
      <div className="input-group mt-1">
        <span className="input-group-addon">{index + OFFSET}</span>
        <input
          type="text"
          className="form-control"
          value={value}
          onChange={this.handleChange}
        />
        <span className="input-group-btn">
          <button type="button" className="btn btn-default" onClick={this.handleRemove}>
            &times;
          </button>
        </span>
      </div>
    )
  }

  handleChange = e =>
    this.props.onChange(this.props.index, e.currentTarget.value)

  handleRemove = () => this.props.onRemove(this.props.index)
}

export default QuestionField
