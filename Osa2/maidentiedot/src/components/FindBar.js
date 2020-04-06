import React from 'react';

const FindBar = ({ text, onChange, hint }) => {
  console.log('FindBar called!');
  
    return (
      <>
        <p>{text} <input onChange={onChange}></input></p>
        <p>{hint}</p>
      </>
    )
  }

export default FindBar