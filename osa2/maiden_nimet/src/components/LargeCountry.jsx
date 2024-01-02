import Weatherbox from "./Weatherbox";

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
            <Weatherbox capitalName={data.Capital} capitalLatitude={data.LatLng[0]} capitalLongitude={data.LatLng[1]}/>
        </div>
    )
}

export default LargeCountry;