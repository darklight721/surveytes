import React, { Component } from 'react'

class AnswerField extends Component {
  render() {
    const { question, value } = this.props

    return (
      <div>
        <label>{question}</label>
        <input type="text" value={value} onChange={this.handleChange} />
      </div>
    )
  }

  handleChange = e => this.props.onChange(this.props.index, e.currentTarget.value)
}

export default AnswerField
