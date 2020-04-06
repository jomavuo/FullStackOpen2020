import React from 'react';
import Language from './Language'
import Weather from './Weather'

const Country = ({ name, capital, population, languages, flagSrc }) => {
  console.log('Country, props: ', name, capital, population, languages, flagSrc);
  
    return (
      <>
        <h1>{name}</h1>
        <p>Capital: {capital}</p>
        <p>Population: {population}</p>
        <h2>Languages:</h2>
        {languages.map((language =>
          <Language key={languages.indexOf(language)} name={language.name} />
        ))}
        <p><img src={flagSrc} alt='' border='1px' width='200'></img></p>
        <Weather capital={capital} />
      </>
    )
  }

export default Country