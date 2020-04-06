import React from 'react';

const PersonForm = ({ onSubmit }) => {
  console.log('PersonForm kutsuttu!');
    
  return (
      <form onSubmit={onSubmit}>
        <div>name: <input id='name' /></div>
        <div>number: <input id='number' /></div>
        <button type='submit'>add</button>
      </form>
    )
  }

  export default PersonForm