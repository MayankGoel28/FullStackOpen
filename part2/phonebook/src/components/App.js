import React, { useState, useEffect } from 'react'
import SubForm from './SubForm.js'
import EachDeet from './EachDeet.js'
import apiserv from '../services/dbservices.js'


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
  const [persons, setPersons] = useState([])
  const [totalid, setID] = useState(0)
  useEffect(() => {
    console.log('effect for fetch')
    apiserv
      .fetchy()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
        console.log(response.data)
        let maxid = 0
        maxid = (response.data).reduce((maxid, num) => maxid < num.id ? num.id : maxid, 0);
        setID(maxid > 0 ? maxid + 1 : 1)
        console.log("id set is", maxid)
      })
  }, [])

  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [message, setMessage] = useState(null)
  const [err, setErr] = useState(null)

  const addDeet = (event) => {
    event.preventDefault()
    let newobj = [...persons]
    console.log(newobj)
    if (newobj.length == 0 || doesNotExist(newName, newobj)) {
      const newPerson = { name: newName, number: newNum, id: totalid }
      setID(totalid + 1)
      newobj.push(newPerson)
      setPersons(newobj)
      apiserv
        .posty(newPerson)
        .then(response => console.log('added a dude with', totalid))
    }
    else {
      const editID = persons.find((person) => {
        if (person.name === newName) {
          return person.id
        }
      })
      let editPerson = {}
      newobj = persons.map((person) => {
        if (person.name === newName) {
          editPerson = { ...person, number: newNum }
          console.log(editPerson, 'is edit person')
          return editPerson
        }
        else return person
      })
      console.log(newobj)
      setPersons(newobj)
      apiserv
        .putty(editID.id, editPerson)
        .then(response => console.log('edited', newName))
    }
    setMessage('Edit successful')
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
    <SubForm setMessage={setMessage} message={message} setErr={setMessage} err={err} addDeet={addDeet} setPersons={setPersons} newName={newName} newNum={newNum} handleName={handleName} handleNum={handleNum} persons={persons} EachDeet={EachDeet} />
  )

}

export default App