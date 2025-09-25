import { use, useEffect, useState } from "react";
import personService from "./service/persons";
import PersonsForm from "./components/Form";
import InputField from "./components/Input";
import Button from "./components/button";
import Persons from "./components/contact";
import Notification from "./components/notification";

function App() {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState('success')

  console.log("list of persons", persons);
  console.log("what is new Name?", newName);

  //utils
  const showNotification = (msg, type = 'success') =>{
    setNotification(msg)
    setNotificationType(type)
    setTimeout(()=> {
      setNotification(null)
    }, 5000)
  }

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
            showNotification(`updated ${returnedPerson.name}'s number`)
          })
          .catch(() => {
            showNotification(`Failed to  update ${person.name}'s number`, 'error');
            setPersons(persons.filter((p) => p.id !== person.id));
          });
      }
    } else {
      const newPerson = {
        name: newName,
        number: number,
      };
      
      if(newName === "" || number === ""){
      return showNotification('enter both input fields', 'error')
      }
      personService
        .create(newPerson)
        .then((returnedPerson) => {
          console.log("POST RESPONSE", returnedPerson);

          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNumber("");
          showNotification(` Added ${returnedPerson.name}`)
        })
        .catch(() => {
          showNotification(`Failed to add ${person.name}`, 'error');
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
        showNotification(`Deleted ${person.name}`)
      })
      .catch(() => {
        showNotification(`failed to delete ${person.name}`, 'error');
      });
  };

  const handleDelete = (id, name) => {
    const confirm = window.confirm(`Delete ${name}?`);
    if (confirm) {
      deletePersons(id);
      showNotification(`${name} removed successfully`);
    } else {
      showNotification('action cancelled');
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
       <Notification  message = {notification} type = {notificationType}/>
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
