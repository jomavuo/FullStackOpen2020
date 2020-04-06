import React from 'react'

const Language = ({ name }) => {
    console.log('language called');
    
    return (
        <>
            <ul>
                <li>{name}</li>
            </ul>
        </>
    )
}

export default Language