import Person from './Person'
const Contacts = ({ persons, removeContact }) => {
    return (
        <div>
            {persons.map((person) => (
            <Person key={person.id} name={person.name} number={person.number}/>
            ))}
        </div>
    )
}

export default Contacts;