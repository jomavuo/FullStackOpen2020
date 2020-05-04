import React from 'react';

const Persons = ({ name, number, handleDelete }) => {
  return (
    <>
      <p>{name} {number} <button type='button' onClick={handleDelete}>Delete</button></p>

    </>
  )
}

export default Persons