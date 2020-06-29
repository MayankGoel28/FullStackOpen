import React from 'react'
import apiserv from '../services/dbservices.js'

const EachDeet = (object) => {
    console.log()
    return (
        <form onSubmit={(event) => deleteEntry(object.id, event, object.setPersons, object.persons, object.setErr)}>
            <p style={{ display: "inline-block" }}>{object.person} {object.number}</p>
            <button type="submit" style={{float: "right", height: "40%"}}>delete</button>
        </form >
    )
}

const deleteEntry = (key, event, setPersons, persons, setErr) => {
    if (window.confirm("Confirm deletion?")) {
        console.log('initial key is', key)
        event.preventDefault()
        let unDelete = ''
        const thing = persons.filter((person) => {
            if (person.id !== key) return person
            else unDelete = person
        })
        setPersons(thing)
        apiserv
            .delety(key)
            .then(response => console.log('deleted key', key))
            .catch(error => { setErr(`${unDelete.id} is already deleted.`) })
    }

}

export default EachDeet
