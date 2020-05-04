import React, { useState, useEffect } from 'react';
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import contactService from './services/contacts'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [filterString, setFilterString] = useState('')
  const [message, setMessage] = useState({ text: null, cName: null })
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const hook = () => {
    contactService
      .getAll()
      .then(returnedContacts => {
        setPersons(returnedContacts)
      })
  }
  useEffect(hook, [])

  const addName = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }

    const newPersonisOnTheList = persons.find(person => person.name.toUpperCase() === newPerson.name.toUpperCase())

    if (newPersonisOnTheList) {
      const foundPerson = persons.find(person => person.name.toUpperCase() === newPerson.name.toUpperCase())
      const modifiedPerson = { ...newPerson }
      const confirm = window.confirm(
        `${foundPerson.name} is already added to phonebook, replace the old number with a new one?`)

      if (confirm) replacePerson(foundPerson, modifiedPerson);

    } else {
      contactService
        .addNew(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNotification(`Added ${newPerson.name}`, 'success')
        })
    }
    document.getElementById('name').value = '';
    document.getElementById('number').value = '';

    setNewName('')
    setNewNumber('')
  }

  const handleFilterChange = (event) => {
    setFilterString(event.target.value.toUpperCase())
  }

  const handleDelete = (person) => {
    const confirmDel = window.confirm(`Delete ${person.name}?`)
    if (confirmDel) {
      contactService
        .deletePerson(person.id)
        .then(setPersons(persons.filter(p => p.id !== person.id)))

      setNotification(`Deleted ${person.name}`, 'success')
    }
  }

  const replacePerson = (foundPerson, modifiedPerson) => {
    contactService
      .replaceContact(foundPerson.id, modifiedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== foundPerson.id ? person : returnedPerson))

        setNotification(`Updated ${foundPerson.name}`, 'success')
      })
      .catch(error => {
        console.log('virhe')
        setNotification(`Information of ${foundPerson.name} has 
            already been removed from server`, 'error')

        setPersons(persons.filter(person => person.id !== foundPerson.id))
      })
  }

  const setNotification = ((text, cName) => {
    setMessage({ text: text, cName: cName })
    setTimeout(() => {
      setMessage({ text: null, cName: null })
    }, 5000)
  })

  const onChangeName = (event) => {
    setNewName(event.target.value)
  }

  const onChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const personsToShow = filterString === ''
    ? persons
    : persons.filter(person => person.name.toUpperCase().includes(filterString) || person.number.includes(filterString))

  return (

    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />

      <Filter text='filter shown with' onChange={handleFilterChange} />

      <h3>Add a new person</h3>

      <PersonForm onSubmit={addName} onChangeName={onChangeName} onChangeNumber={onChangeNumber} />

      <h3>Numbers</h3>

      {personsToShow.map((person) =>
        <Persons key={person.name} name={person.name} number={person.number}
          handleDelete={() => handleDelete(person)} />
      )}
    </div>
  )
}

export default App;