import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PhonebookForm from './components/PhonebookForm'
import Contacts from './components/Contacts'
import contactService from './services/contacts'

const App = () => {
  const [persons, setPersons] = useState([])
  
  const [formData, setFormData] = useState({
    newName: '',
    newNumber: '',
  })

  useEffect(() => {
    contactService.getAll()
      .then(initialContacts => {
        setPersons(initialContacts)
      }
      )  
  }, [])

  // phonebookform-lomakkeen tilapäivitys kun kirjoitetaan
  const handlePhonebookFormInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const [filter, setFilter] = useState('')
  
  const addContact = (event) => {
    // ts. älä lataa sivua uudelleen
    event.preventDefault()

    // tarkistetaan onko nimi listassa,
    // jos ei, niin N
    const foundPerson = persons.find(
      (person) => person.name.toLowerCase() === formData.newName.toLowerCase()
    )
    
    if (foundPerson) {
      const ans = window.confirm(`${formData.newName} is already added to the phonebook, replace the old number with a new one?`)
      if (ans) {
        contactService
        // syötetään uusi arvo patchillä
        .patch(foundPerson.id, {number: formData.newNumber})
        // vastauksessa muutettu resurssi
        .then(returnedPerson => {
          // kun löydetään muutetun henkilön id, asetetaan uudet arvot
          setPersons(persons.map(person => person.id !== foundPerson.id ? person : returnedPerson))
        })
        return
      }
    }

    const newPerson = {
      name: formData.newName,
      number: formData.newNumber,
    }

    contactService
      .create(newPerson)
      .then(returnedPerson => {
        console.log(returnedPerson);
        setPersons((prevPersons) => [...prevPersons, returnedPerson])
        setFormData({ newName: '', newNumber: '' })
      })
  }

  // joka kerta kun renderöidään, sijoitetaan filtterin mukaiset henkilöt muuttujaan.
  // näytetään myöhemmin vain filtteröidyt henkilöt
  const filtered = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase()) ||
    person.number.includes(filter)
    
  )

  const removeContact = (id) => {
    /* contactService
    .remove(id) */
    console.log('clicked on:');
    console.log(id);
    
  }

  return (
    <div>
      <Filter filter={filter} setFilter={setFilter}/>
      <h2>Phonebook</h2>
      <PhonebookForm
        formData={formData}
        setFormData={setFormData}
        handleInputChange={handlePhonebookFormInputChange}
        addContact={addContact}
      />
      <h2>Numbers</h2>
      <Contacts persons={filtered}/>
    </div>
  )
}

export default App;
