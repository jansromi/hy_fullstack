import axios from "axios";
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'

const getAll = () => {
    const req = axios.get(`${baseUrl}all`);
    return req.then(r => r.data);
}

const getLargeCountry = async (countryName) => {
    const req = await axios.get(`${baseUrl}/name/${countryName}`);
    const data = req.data;

    const countryData = {
        OfficialName: data.name.official,
        CommonName: data.name.common,
        Capital: data.capital,
        Area: data.area,
        languages: data.languages,
        LatLng: data.capitalInfo.latlng,
        FlagUrl: data.flags.png,
        FlagAlt: data.flags.alt
    };

    return countryData
}
export default { getAll, getLargeCountry }