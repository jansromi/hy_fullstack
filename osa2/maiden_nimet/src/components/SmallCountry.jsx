const SmallCountry = (props) => {
    
    return (
        <div>
            <ul>
            <li>{props.CommonName} <button onClick={() => props.showCountry(props.CommonName)}>Show</button></li>
            </ul>
        </div>
    )
}

export default SmallCountry;