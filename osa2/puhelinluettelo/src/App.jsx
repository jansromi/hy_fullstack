import { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1,
      name: 'Arto Hellas',
      number: '040-1234567'
    },
    {
      id: 2,
      name: 'Grace Hopper',
      number: '040-9876543'
    }
  ]) 
  const [newName, setNewName] = useState('')


  const addName = (event) => {
    // ts. älä lataa sivua uudelleen
    event.preventDefault()

    // tarkistetaan onko nimi listassa
    const exists = persons.some(person => person.name.toLocaleLowerCase() === newName.toLocaleLowerCase())
    
    if (exists) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const newPerson = {
      id: persons.length + 1,
      name: newName
    }
    // lisää uusi yhteystieto
    setPersons(prevPersons => [...prevPersons, newPerson]);
    setNewName('')
  }

  // renderöi uusi nimi
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name:
          <input value={newName}
          onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      
      {persons.map(person => <Person key={person.id} name={person.name} number={person.number} />)}
      
    </div>
  )

}

export default App
