const Person = (props) => {
    return (
        <ul>
            <li><b>{props.name}</b> <button onClick={props.removeContact}>DELETE</button></li>
            <li>{props.number}</li>
        </ul>
    );
}

export default Person;