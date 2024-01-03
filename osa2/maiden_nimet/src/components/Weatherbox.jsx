import weatherService from "../services/weather";
import { useState, useEffect } from "react";

const Weatherbox = ({ capitalName, capitalLatitude, capitalLongitude }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await weatherService.getWeatherData(
          capitalLatitude,
          capitalLongitude
        );
        setData(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [capitalLatitude, capitalLongitude]);

  // data has not arrived yet
  if (data === null) {
    return <div></div>;
  }

  return (
    <div>
      <h2>Weather in {capitalName}</h2>
      <p>Temperature is <b>{data.main["temp"]}</b>, but feels like <b>{data.main["feels_like"]}</b></p>
      <img src={`https://openweathermap.org/img/wn/${data.weather[0]["icon"]}@2x.png`} alt="Weather Icon"/>
      <p>Wind is <b>{data.wind["speed"]} m/s</b></p>
    </div>
  );
};

export default Weatherbox;