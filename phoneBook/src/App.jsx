import { use, useEffect, useState } from "react";
import axios from 'axios'
import PersonsForm from './components/Form';
import InputField from "./components/Input";
import Button from "./components/button";
import Persons from "./components/contact";




function App() {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("a new name...");
  const [number, setNumber] = useState("eg. 11-22-3333333");
  const [searchTerm, setSearchTerm] = useState("");
  console.log("list of persons", persons);
  console.log("what is new Name?", newName);


  const hooks = ()=> {
  const promise = axios.get('http://localhost:3002/persons')
  promise.then(response => {
  setPersons(response.data)
})
  console.log('promise??', promise)
  }

  useEffect(hooks, [])
  console.log('render', persons.length, 'contacts')

  //filtering displayed element
  const personToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log("person to show", personToShow);

  const handleAdd = (e) => {
    e.preventDefault();
    console.log(e.target);
    const namesObject = {
      name: newName,
      number: number,
      id: persons.length + 1,
    };
    if (
      persons.some(
        (person) => person.name === newName || person.number === number
      )
    ) {
      alert(`${newName} or ${number} is already added to phonebook`);
      return;
    }
    setPersons(persons.concat(namesObject));
    setNewName("");
    setNumber("");
  };

  const handleNewName = (e) => {
    const inputValue = e.target.value;
    console.log("What is inputValue", inputValue);
    setNewName(inputValue);
  };

  const handleNumber = (e) => {
    const inputNumber = e.target.value;
    console.log("what is number?", inputNumber);
    setNumber(inputNumber);
  };

  const handleSearch = (e) => {
    console.log("search value?", e.target.value);
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <h2>Phonebook</h2>

      <InputField
        label={"filter shown with:"}
        value={searchTerm}
        onChange={handleSearch}
      />

      <h2>add a new</h2>

      <PersonsForm onSubmit={handleAdd}>
        <InputField label={"name:"} value={newName} onChange={handleNewName} />
        <InputField label={" number:"} value={number} onChange={handleNumber} />

      <Button type="submit" text = "add"/>
  
      </PersonsForm>

      <div>
        <h2>Numbers</h2>
        {personToShow.map((person) => (
          <Persons key={person.id} person={person} />
        ))}
      </div>
    </>
  );
}

export default App;
