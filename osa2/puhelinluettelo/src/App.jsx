import { useState } from 'react'
import Person from './components/Person'

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
  ])

  const [formData, setFormData] = useState({
    newName: '',
    newNumber: '',
  })

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

  return (
    <div>
      <h2>Phonebook</h2>
      <PhonebookForm
        formData={formData}
        setFormData={setFormData}
        addContact={addContact}
      />
      <h2>Numbers</h2>

      {persons.map((person) => (
        <Person key={person.id} name={person.name} number={person.number} />
      ))}
    </div>
  )
}

export default App;
