import React from 'react';

const Filter = ({ text, onChange }) => {
  console.log('Filter-komponentti kutsuttu!')
  return (
    <div>{text} <input onChange={onChange} /></div>
  )
}

export default Filter