import React, { useState } from 'react'
import SubForm from './SubForm.js'
import EachDeet from './EachDeet.js'

let totalid = 1

function doesNotExist(check, newobj) {
  for (var i = 0; i < newobj.length; i++) {
    if (newobj[i].name == check) {
      return (
        false
      )
    }
  }
  return (true)
}

const App = () => {
  const [persons, setPersons] = useState([
    // { name: 'Arto Hellas', id: totalid++, num: '040-123456' },
    // { name: 'Ada Lovelace', id: totalid++, numb: '39-44-5323523' },
    // { name: 'Dan Abramov', id: totalid++, num: '12-43-234345' },
    // { name: 'Mary Poppendieck', id: totalid++, num: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')

  const addDeet = (event) => {
    event.preventDefault()
    const newobj = [...persons]
    console.log(newobj)
    if (newobj.length == 0 || doesNotExist(newName, newobj)) {
      newobj.push({ name: newName, num: newNum, id: totalid++ })
      setPersons(newobj)
    }
    else {
      window.alert(`${newName} is already added to phonebook`);
    }
    setNewName('')
    setNewNum('')
  }
  const handleName = (event) => {
    setNewName(event.target.value)
    console.log(newName)
  }
  const handleNum = (event) => {
    setNewNum(event.target.value)
    console.log(newNum)
  }
  return (
    <SubForm addDeet={addDeet} newName={newName} newNum={newNum} handleName={handleName} handleNum={handleNum} persons={persons} EachDeet={EachDeet} />
  )

}

export default App