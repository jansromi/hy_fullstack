const LargeCountry = ({ data }) => {
    if (data == null) return;
    return (
        <div>
            <h1>{data.OfficialName}</h1>
            <p>Capital: {data.Capital}</p>
            <p>Area: {data.Area}</p>
            <h2>languages:</h2>
            <ul>
                {Object.entries(data.languages).map(([id, lang]) => (
                    <li key={id}>{lang}</li>
                ))}
            </ul>
            <img src={data.FlagUrl} alt={data.FlagAlt} />
        </div>
    )
}

export default LargeCountry;