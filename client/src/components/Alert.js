import React from 'react'

const Alert = ({ children, type, onClose }) => (
  <div className={`alert alert-${type === 'error' ? 'danger' : ''}`}>
    {onClose
      ?
        <button type="button" onClick={onClose} className="close">
          &times;
        </button>
      : null
    }
    {children}
  </div>
)

export default Alert
