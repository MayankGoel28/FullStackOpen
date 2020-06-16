import React, { useState } from 'react';
import ShowNations from './ShowNations.js'

const App = () => {
  const [query,SetQuery] = useState('')
  const handleQuery = (event) => {
    SetQuery(event.target.value)
  }
  return (
    <div>
      <h2>Countries Dataset</h2>
      <form>
        <div>
          query: <input value={query} onChange={handleQuery} />
        </div>
      </form>
      <ShowNations query={query}/>
    </div>
  )
}

export default App;
