import React from 'react'

const ShowDeets = (props) => {
    let thing = props.persons
    function checkInclusion(a, b) {
        const masterStr = a.toLowerCase();
        const subStr = b.toLowerCase();
        return masterStr.includes(subStr)
    }
    if (!(props.newKey === '')) {
        thing = props.persons.filter((person) => checkInclusion(person.name, props.newKey))
    }
    return (
        <div>
            {
                thing.map((person) =>
                    <props.EachDeet setErr={props.setErr} persons={props.persons} setPersons={props.setPersons} key={person.id} id={person.id} person={person.name} number={person.number} />)
            }
        </div>
    )
}

export default ShowDeets