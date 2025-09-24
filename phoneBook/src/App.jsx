import { use, useEffect, useState } from "react";
import personService from "./service/persons";
import PersonsForm from "./components/Form";
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

  //empty array dependency, only runs the first time the component is rendered
  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      console.log("initial persons", initialPersons);
      setPersons(initialPersons);
    });
  }, []);
  console.log("render", persons.length, "contacts");

  //filtering element to display
  const personToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log("person to show", personToShow);

  const handleAdd = (e) => {
    e.preventDefault();
    console.log(e.target);
    // if (
    //   persons.some(
    //     (person) => person.name === newName || person.number === number
    //   )
    // ) {
    //   alert(`${newName} or ${number} is already added to phonebook`);
    //   return;
    // }

    const person = persons.find(
      (p) => p.name.toLowerCase() === newName.toLowerCase()
    );
    console.log("PERSON", person);
    if (person) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number with new one?`
      );

      if (confirmUpdate) {
        const changedPerson = { ...person, number: number };
        personService
          .update(person.id, changedPerson)
          .then((returnedPerson) => {
            console.log("updated person?", returnedPerson);
            setPersons(
              persons.map((p) => p.id === person.id ? returnedPerson : p)
            );
            setNewName("");
            setNumber("");
          })
          .catch((error) => {
            alert(`Failed to  update ${newName}'s number`);
            setPersons(persons.filter((p) => p.id !== person.id));
          });
      }
    } else {
      const newPerson = {
        name: newName,
        number: number,
      };
      personService
        .create(newPerson)
        .then((returnedPerson) => {
          console.log("POST RESPONSE", returnedPerson);
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNumber("");
        })
        .catch((error) => {
          alert("Failed to add new person");
        });
    }
  };

  const deletePersons = (id) => {
    const person = persons.find((p) => p.id === id);
    if (!person) return;
    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      })
      .catch((error) => {
        alert("Delete failed", error);
      });
  };

  const handleDelete = (id, name) => {
    const confirm = window.confirm(`Delete ${name}?`);
    if (confirm) {
      deletePersons(id);
      alert("item deleted");
    } else {
      alert("user cancelled the action");
    }
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

        <Button type="submit" text="add" />
      </PersonsForm>

      <div>
        <h2>Numbers</h2>
        {personToShow.map((person) => (
          <Persons
            key={person.id}
            person={person}
            handleDelete={() =>
              handleDelete(person.id, person.name, person.number)
            }
          />
        ))}
      </div>
    </>
  );
}

export default App;
