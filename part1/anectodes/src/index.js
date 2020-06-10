import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, SetVotes] = useState(new Uint8Array(anecdotes.length))
  console.log(votes)
  const votefunc = () => {
    let newarr = [...votes];
    newarr[selected] += 1;
    SetVotes(newarr);
  }
  const nextfunc = () => {
    setSelected(Math.floor(Math.random() * props.anecdotes.length));
  }
  return (
    <div>
      <h1>Anectode of the Day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={() => votefunc()}>
        Vote
      </button>
      <button onClick={() => nextfunc()}>
        next anectode
      </button>
      <TopVote anecdotes={props.anecdotes} votes={votes} />
    </div>
  )
}
const TopVote = (props) => {
  let maxval = Math.max(...props.votes)
  let maxind = props.votes.indexOf(maxval);
  return (
    <div>
      <h1>Anectode with highest votes is </h1>
      <p>{props.anecdotes[maxind]}</p>
      <p>Has {maxval} votes</p>
    </div>

  )
}
const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]
ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)