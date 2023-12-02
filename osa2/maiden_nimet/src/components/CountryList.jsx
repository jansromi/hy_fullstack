import SmallCountry from "./SmallCountry"

const CountryList = ({ countries }) => {
    return (
        <div>
            {countries.map((country) => (
                <SmallCountry key={country.cca3} CommonName={country.name.common}/>
            ))}
        </div>
    )
}

export default CountryList;