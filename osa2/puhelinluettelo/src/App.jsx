import { useState } from 'react'
import Person from './components/Person'

/**
 * kenttä kontaktifiltterille 
 */
const Filter = ({ filter, setFilter }) => {
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Filter</h2>
      filter contacts:  
      <input value={filter} onChange={handleFilterChange}>
      </input>
    </div>
  )
}

/**
 * Lomake uusille kontakteille
 */
const PhonebookForm = ({ formData, setFormData, addContact }) => {
  // renderöi uusi nimi
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  return (
    <form onSubmit={addContact}>
      <div>
        name:
        <input
          name="newName"
          value={formData.newName}
          onChange={handleInputChange}
        />
      </div>
      <div>
        number:
        <input
          name="newNumber"
          value={formData.newNumber}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

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
        addContact={addContact}
      />
      <h2>Numbers</h2>
      
      {filtered.map((person) => (
        <Person key={person.id} name={person.name} number={person.number} />
      ))}
    </div>
  )
}

export default App;
