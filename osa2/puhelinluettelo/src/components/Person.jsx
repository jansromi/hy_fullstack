const Person = ( props ) => {
    return (
        <ul>
            <li><b>{props.name}</b></li>
            <li>{props.number}</li>
        </ul>
    );
}

export default Person;