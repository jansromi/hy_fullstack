import Person from './Person'
const Contacts = ({ persons }) => {
    return (
        <div>
            {persons.map((person) => (
            <Person key={person.id} name={person.name} number={person.number} />
            ))}
        </div>
    )
}

export default Contacts;