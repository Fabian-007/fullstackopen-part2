import Country from "./country";

const CountryDisplay = (props) => {
console.log('props in country display', props)
const { value, filteredCountries, showDetails, setShowDetails, weather } = props;
 
if (value && filteredCountries.length > 10) {
  return <div>Too many matches, please specify another filter.</div>;
} 

if (showDetails) {
  return (
    <>
      <Country 
      country={showDetails} 
      setShowDetails = {setShowDetails}
      />
      {weather && (
        <div>
          <h3>Weather in {showDetails.capital}</h3>
          <div>Temperature: {weather.main.temp} °C</div>
          <div>{weather.weather?.[0] && (
          <img 
          src= {`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
          alt= {weather.weather[0].description} />
          )}
          </div>
          <div>Wind: {weather.wind.speed} m/s</div>
        </div>
      )}
     </>
  )
    
}
if (filteredCountries.length > 1) {
  return (
    <ul>
      {filteredCountries.map((country) => (
        <li key={country.name.common}>
          {country.name.common} {""}
          <button onClick={() => setShowDetails(country) // show details
           }>show</button>
        </li>
      ))}
    </ul>
  )
}

if (filteredCountries.length === 1) {
  return <Country country={filteredCountries[0]} />;  
}
return null;
}

export default CountryDisplay;