import { useState } from 'react'

const Number = (props) =>{
console.log('props value', props)
const {person} = props
return (
  <>
 <div> {person.name}</div>
  </>
)
}

function App() {
const [persons, setPersons] = useState([{name:'Fabian Nobert'}])
const [newName, setNewName] = useState('a new name...')
console.log('list of persons', persons)
console.log('what is new Name?', newName)




const handleAdd = (e) => {
e.preventDefault()
console.log(e.target)
const namesObject = {
name: newName
}
setPersons(persons.concat(namesObject))
setNewName('')

}

const handleNewName = (e)=> {
const inputValue = e.target.value
console.log('What is inputValue', inputValue)
if(persons.some(person => person.name === inputValue)){
alert(`${inputValue} is already added to phonebook`)

}
setNewName(inputValue)
}

  
  return (
    <>
    <h2>Phonebook</h2>
    <form onSubmit={handleAdd}>
      <div>
      name: <input
      value = {newName}
      onChange={handleNewName}
      />
      </div>
      <div><button type='submit'>add</button></div>
    </form>

    <div>
    <h2>Numbers</h2>
    {persons.map(person => 
    <Number key = {person.name} person = {person}/>
    )}

    </div>
    </>
  )
}

export default App
