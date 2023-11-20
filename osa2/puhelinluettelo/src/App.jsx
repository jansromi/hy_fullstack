import { useState } from 'react'
import Filter from './components/Filter'
import PhonebookForm from './components/PhonebookForm'
import Contacts from './components/Contacts'

const App = () => {
  const [persons, setPersons] = useState([
    {
      id: 1,
      name: 'Arto Hellas',
      number: '040-1234567',
    },
    {
      id: 2,
      name: 'Grace Hopper',
      number: '040-9876543',
    },
    {
      id: 3,
      name: 'Ada Lovelace',
      number: '39-44-5323523'
    },
    {
      id: 4,
      name: 'Dan Abramov',
      number:  '12-43-234345'
    },
    {
      id: 5,
      name: 'Mary Poppendieck',
      number: '39-23-6423122'
    }
  ])

  const [formData, setFormData] = useState({
    newName: '',
    newNumber: '',
  })

  // phonebookform-lomakkeen tilapäivitys kun kirjoitetaan
  const handlePhonebookFormInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const [filter, setFilter] = useState('')
  
  const addContact = (event) => {
    // ts. älä lataa sivua uudelleen
    event.preventDefault()

    // tarkistetaan onko nimi listassa
    const exists = persons.some(
      (person) => person.name.toLowerCase() === formData.newName.toLowerCase()
    )

    if (exists) {
      alert(`${formData.newName} is already added to the phonebook`)
      return
    }

    const newPerson = {
      id: persons.length + 1,
      name: formData.newName,
      number: formData.newNumber,
    }
     // lisää uusi yhteystieto tietorakenteeseen
    setPersons((prevPersons) => [...prevPersons, newPerson])
    // aseta tyhjät alkuarvot kenttiin
    setFormData({ newName: '', newNumber: '' })
  }

  // joka kerta kun renderöidään, sijoitetaan filtterin mukaiset henkilöt muuttujaan.
  // näytetään myöhemmin vain filtteröidyt henkilöt
  const filtered = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase()) ||
    person.number.includes(filter)
    
  )

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
