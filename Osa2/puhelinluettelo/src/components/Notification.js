import React from 'react';

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