import React from 'react';

const Filter = ({ text, onChange }) => {
  return (
    <div>{text} <input onChange={onChange} /></div>
  )
}

export default Filter