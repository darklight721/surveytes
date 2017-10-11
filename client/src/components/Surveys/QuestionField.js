import React, { Component } from 'react'

class QuestionField extends Component {
  render() {
    const { value } = this.props

    return (
      <div>
        <input type="text" value={value} onChange={this.handleChange} />
        <button type="button" onClick={this.handleRemove}>&times;</button>
      </div>
    )
  }

  handleChange = e =>
    this.props.onChange(this.props.index, e.currentTarget.value)

  handleRemove = () => this.props.onRemove(this.props.index)
}

export default QuestionField
