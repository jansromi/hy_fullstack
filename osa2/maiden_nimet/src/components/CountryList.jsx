import SmallCountry from "./SmallCountry"

const CountryList = ({ countries, showCountry }) => {
    return (
        <div>
            {countries.map((country) => (
                <SmallCountry key={country.cca3} CommonName={country.name.common} showCountry={showCountry}/>
            ))}
        </div>
    )
}

export default CountryList;