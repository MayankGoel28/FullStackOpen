import React, { useState } from 'react'
import ReactDOM from 'react-dom'
const Statistic = (props) => {
  return (
    <React.Fragment>
      <td>{props.text}</td>
      <td>{props.val}</td>
    </React.Fragment>

  )
}

const Statistics = (props) => {
  const all = props.good + props.bad + props.neutral;
  const average = (props.good - props.bad) / all
  const positive = props.good * 100 / all
  const positivetext = String(positive) + "%"
  if (all > 0) {
    return (
      <table>
        <tbody>
          <tr>
            <Statistic text="good" val={props.good} />
          </tr>
          <tr>
            <Statistic text="neutral" val={props.neutral} />
          </tr>
          <tr>
            <Statistic text="bad" val={props.bad} />
          </tr>
          <tr>
            <Statistic text="all" val={all} />
          </tr>
          <tr>
            <Statistic text="average" val={average} />
          </tr>
          <tr>
            <Statistic text="positive" val={positivetext} />
          </tr>
        </tbody>
      </table>
    )
  }
  return (
    <div>
      <p>No feedback given</p>
    </div>
  )
}
const Button = (props) => {
  return (
    <button onClick={props.event}>{props.val}</button>
  )
}
const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  return (
    <div>
      <h1>give feedback</h1>
      <Button val="good" event={() => setGood(good + 1)} />
      <Button val="neutral" event={() => setNeutral(neutral + 1)} />
      <Button val="bad" event={() => setBad(bad + 1)} />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div >
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)