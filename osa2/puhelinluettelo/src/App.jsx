import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PhonebookForm from './components/PhonebookForm'
import Notification from './components/Notification'
import Contacts from './components/Contacts'
import contactService from './services/contacts'


const App = () => {
  const [persons, setPersons] = useState([])
  const [formData, setFormData] = useState({
    newName: '',
    newNumber: '',
  })
  const [msg, setNotifMsg] = useState(null);
  
  // Aseta notifikaatioviesti joka katoaa 5 sekunnin kuluttua
  const setNotificationMessage = (message) => {
    setNotifMsg(message);
    setTimeout(() => {
      setNotifMsg(null);
    }, 5000);
  }
  
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
          setPersons(persons.map(person => person.id !== foundPerson.id ? person : returnedPerson));
          setNotificationMessage(`Number of ${foundPerson.name} was changed`)
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
        setNotificationMessage(`Added ${returnedPerson.name}`);
      })
  }

  // joka kerta kun renderöidään, sijoitetaan filtterin mukaiset henkilöt muuttujaan.
  // näytetään myöhemmin vain filtteröidyt henkilöt
  const filtered = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase()) ||
    person.number.includes(filter)
    
  )

  // funktio kontaktion poistoon
  const removeContact = (personToRemove) => {
    const ans = window.confirm(`Delete ${personToRemove.name}?`)
    if (ans) {
      contactService
      .remove(personToRemove.id)
      .then(() => {
        // filtteröidään muuttujaan ne henkilöt, joiden id on eri kuin poistettavan henkilön
        const updatedPersons = persons.filter(person => person.id !== personToRemove.id)
        setPersons(updatedPersons)
        setNotificationMessage(`Contact '${personToRemove.name}' removed`)
      }
      )
    }
    else {
      return
    }
  }

  return (
    <div>
      <Notification message={msg}/>
      <Filter filter={filter} setFilter={setFilter}/>
      <h2>Phonebook</h2>
      <PhonebookForm
        formData={formData}
        setFormData={setFormData}
        handleInputChange={handlePhonebookFormInputChange}
        addContact={addContact}
      />
      <h2>Numbers</h2>
      <Contacts persons={filtered} removeContact={removeContact}/>
    </div>
  )
}

export default App;