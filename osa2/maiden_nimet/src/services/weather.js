import axios from "axios";
const apiKey = import.meta.env.VITE_WEATHER_API;

const getWeatherData = async (lat, lng) => {
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`;
    try {
        const response = await axios.get(weatherApiUrl);
        const data = response.data;
        return data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
    }
};

export default { getWeatherData };