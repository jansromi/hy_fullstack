import { useState, useEffect, useMemo } from "react";
import Searchbox from "./components/SearchBox";
import countryService from "./services/countries";
import CountryList from "./components/CountryList";
import LargeCountry from "./components/LargeCountry";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [largeCountry, setLargeCountry] = useState(null);
  const [countryClicked, setCountryClicked] = useState(false)

  useEffect(() => {
    countryService.getAll().then(data => {
      setCountries(data);
    });
    
  }, []);

  // add a listener to filter.
  // when user types to search bar,
  // this clears the display from showing
  // a large country.
  useEffect(() => {
    setCountryClicked(false);
  }, [filter]);

  const fetchCountry = (countryName) => {
    countryService.getLargeCountry(countryName)
      .then(data => {
        setLargeCountry(data);
      })
      .catch(error => {
        console.error('Error fetching large country data:', error);
      });
  };

  // runs only when filter is updated.
  // if there is only one matching country,
  // fetch dataset for showing detailed view of the country
  const filteredCountries = useMemo(() => {
    const result = countries.filter((country) =>
      country.name.common.toLowerCase().includes(filter.toLowerCase())
    );

    // if only one country is found,
    // and largeCountry is not undefined or null,
    // and its property CommonName is not same as the found country's.
    // (In other words, if the country is already assigned, dont fetch it again)
    if (result.length === 1 && largeCountry?.CommonName !== result[0].name.common) {
      fetchCountry(result[0].name.common);
      console.log(`Fetched ${result[0].name.common}`);
    }

    return result;
  }, [filter]);

  // Take this function to each button in country listing.
  // If user clicks on the show-button, it sets the boolean for 
  // showing a large country and initializes the data for the large
  // country with fetchcountry
  const showCountry = (countryName) => {
    setCountryClicked(true);
    fetchCountry(countryName)
  }

  return (
    <div>
      <Searchbox filter={filter} setFilter={setFilter}/>
      {filteredCountries.length > 10 && !countryClicked
        ? <p>Too many countries, specify another filter</p>
        : null
      }
      {filteredCountries.length <= 10 && filteredCountries.length > 1 && !countryClicked
      ? <CountryList countries={filteredCountries} showCountry={showCountry} />
      : null
      }
      {filteredCountries.length === 1 || countryClicked
      ? <LargeCountry data={largeCountry}/>
      : null
      }
      
    </div>
  );
};

export default App;
