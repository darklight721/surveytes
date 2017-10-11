import React from 'react'

const Alert = ({ children, type, onClose }) => (
  <span className={type}>
    {children}
    {onClose ? <button onClick={onClose}>&times;</button> : null}
  </span>
)

export default Alert
