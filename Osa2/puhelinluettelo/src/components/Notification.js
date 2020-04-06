import React from 'react';

const Notification = ({ message }) => {
    console.log('Notificationin props: ', message.text, message.cName);
    
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