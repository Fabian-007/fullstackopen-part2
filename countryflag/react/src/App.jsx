import { useEffect, useState } from "react";
import axios from "axios";
import CountryDisplay from './components/countryDisplay';



function App() {
  const [value, setValue] = useState("");
  const [countries, setCountries] = useState([]);
  const [showDetails, setShowDetails] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  // Fetch weather when showCountry changes
  useEffect(() => {
    const apikey =  import.meta.env.VITE_SOME_KEY
    console.log('api key', apikey)
// variable api_key now has the value set in startup
    if (showDetails && showDetails.latlng) {
      const [lat, lon] = showDetails.latlng;
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`)
        .then((response) => {
          setWeather(response.data);
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });
    } else {
      setWeather(null);
    }
  }, [showDetails]);

  console.log('country details', showDetails)
  console.log('weather', weather)

  console.log("render", countries.length, "countries");

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(value.toLowerCase())
  );
  console.log('type of filteredCountries', typeof filteredCountries)
  console.log('filtered countries', filteredCountries)


  console.log("countries to show", filteredCountries);

  const handleChange = (event) => {
    event.target.value;
    console.log("input", event.target.value);
    setValue(event.target.value);
  };


  return (
    <>
      <form>
        find countries <input 
        value={value} 
        onChange={handleChange} />
      </form>
   <CountryDisplay 
    value = {value}
    filteredCountries = {filteredCountries} 
    showDetails = {showDetails}
    setShowDetails = {setShowDetails}
    weather = {weather} 
    /> 
    </>
  );
}

export default App;
