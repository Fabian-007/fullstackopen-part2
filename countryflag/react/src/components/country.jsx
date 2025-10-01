const Country = (props) => {
  const { country, setShowDetails } = props;
  console.log("country props", props);
  return (
    <>
      <h2>{country.name.common} <button onClick={() => setShowDetails(null)}>Hide</button></h2>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <h3>languages:</h3>
      <ul>
        {/*Object.values to get an array of the values of the languages: 
      object extracts the language names into an array
      then maps them into <li> elements
      */}
        {country.languages ? (
          Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))
        ) : (
          <p>No languages data available</p>
        )}
        <img
          src={country.flags.png}
          alt={`Flag of ${country.name.common}`}
          width="150"
        />
      </ul>
    </>
  );
};

export default Country;