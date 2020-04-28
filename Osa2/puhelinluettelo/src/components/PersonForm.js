import React from 'react';

const PersonForm = ({ onSubmit, onChangeName, onChangeNumber }) => {
  console.log('PersonForm kutsuttu!');
    
  return (
      <form onSubmit={onSubmit}>
        <div>name: <input id='name' onChange={onChangeName} /></div>
        <div>number: <input id='number' onChange={onChangeNumber} /></div>
        <button type='submit'>add</button>
      </form>
    )
  }

  export default PersonForm