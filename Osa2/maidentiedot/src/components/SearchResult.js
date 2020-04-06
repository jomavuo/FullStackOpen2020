import React from 'react';

const SearchResult = ({ name, handleClick }) => {
  return (
    <>
      <div>{name} <button type='button' onClick={handleClick}>show</button></div>
    </>
  )
}

export default SearchResult