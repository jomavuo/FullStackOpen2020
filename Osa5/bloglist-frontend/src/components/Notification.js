import React from 'react'
import './notification.css'

const Notification = ({ message }) => {
  if (message.text === null || message.cName === null) {
    return null
  } else {
    return (
      <div className={message.cName}>
        {message.text}
      </div>
    )
  }
}
export default Notification