import React, { useState } from 'react'
import ShowDeets from './ShowDeets.js'
import ConfirmNotif from './ConfirmNotif.js'
import ErrorNotif from './ErrorNotif.js'

const SubForm = (props) => {
  const [newKey, setKey] = useState('')
  const handleSearch = (event) => {
    setKey(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          filter: <input value={newKey} onChange={handleSearch} />
        </div>
      </form>
      <ConfirmNotif setMessage={props.setMessage} message={props.message} />
      <ErrorNotif setErr={props.setMessage} err={props.err} />
      <h2> Add new </h2>
      <form onSubmit={props.addDeet}>
        <div>
          name: <input value={props.newName} onChange={props.handleName} />
        </div>
        <div>
          number: <input value={props.newNum} onChange={props.handleNum} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {<ShowDeets setErr={props.setErr} setPersons={props.setPersons} newKey={newKey} persons={props.persons} EachDeet={props.EachDeet} />}
    </div>
  )
}

export default SubForm