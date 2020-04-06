import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchResult from './components/SearchResult'
import Country from './components/Country'
import FindBar from './components/FindBar'


const App = () => {
  const [countries, setCountries] = useState([])
  const [findString, setFindString] = useState('')

  const hook = () => {
    console.log('hook called');
    
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
        console.log('countries received');
        
      })
  }
  useEffect(hook, [])

  const handleFind = (event) => {
    setFindString(event.target.value.toUpperCase())
  }

  const handleClick = (country) => {
    setFindString(country.name)
  }

  const filteredCountries = findString === ''
    ? []
    : countries.filter(country => country.name.toUpperCase().includes(findString.toUpperCase()));

//Näytetään eri näkymät riippuen monta maata jäljellä
  if (filteredCountries.length === 1) {
    console.log('filtered countries: ', filteredCountries);
    
    const country = filteredCountries[0]
    const languages = filteredCountries[0].languages

    return (
      <div>
        <FindBar text='find countries: ' onChange={handleFind} />
        <Country name={country.name} capital={country.capital} population={country.population}
          languages={languages} flagSrc={country.flag} />
      </div>
    )
  }
  else if (filteredCountries.length < 1 || filteredCountries.length >= 10) {
    return (
      <div>
        <FindBar text='find countries: ' onChange={handleFind} hint='Too many matches, specify another filter' />
      </div>
    )
  }
  else {
    return (
      <div>
        <FindBar text='find countries: ' onChange={handleFind} />
        {filteredCountries
          .map(country =>
            <SearchResult key={filteredCountries.indexOf(country)} name={country.name} handleClick={() => handleClick(country)} />
          )}
      </div>
    )
  }

}
export default App;
