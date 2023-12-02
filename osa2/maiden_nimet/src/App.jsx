import { useState, useEffect, useMemo } from "react";
import Searchbox from "./components/SearchBox";
import countryService from "./services/countries";
import CountryList from "./components/CountryList";
import LargeCountry from "./components/LargeCountry";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [largeCountry, setLargeCountry] = useState(null);

  useEffect(() => {
    countryService.getAll().then(data => {
      setCountries(data);
    });
    
  }, []);

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
  
    
    if (result.length === 1) {
      if (largeCountry != null) {
        if (largeCountry.CommonName == result[0].name.common) {
          return result;
        }
      }
      fetchCountry(result[0].name.common);
      console.log(`Fetched ${result[0].name.common}`);
    }
  
    return result;
  }, [filter]);


  
  return (
    <div>
      <Searchbox filter={filter} setFilter={setFilter}/>
      {filteredCountries.length > 10
        ? <p>Too many countries, specify another filter</p>
        : null
      }
      {filteredCountries.length <= 10 && filteredCountries.length > 1
      ? <CountryList countries={filteredCountries} />
      : null
      }
      {filteredCountries.length === 1
      ? <LargeCountry data={largeCountry}/>
      : null
      }
      
    </div>
  );
};

export default App;
