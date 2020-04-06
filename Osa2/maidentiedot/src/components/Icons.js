import React from 'react'

const Icons = ({ src }) => {
    console.log('Icons called!');
    
    return (
        <>
            <p><img src={src} alt=''></img></p>
        </>
    )
}

export default Icons