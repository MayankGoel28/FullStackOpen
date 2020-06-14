import React from 'react'

const ShowDeets = (props) => {
    let thing = props.persons
    if (!(props.newKey==='')){
        thing = props.persons.filter((person) => person.name.includes(props.newKey))
        console.log('yo',props.person)
    }
    return (
        <div>
            {
                thing.map((person) =>
                    <props.EachDeet key={person.id} person={person.name} number={person.num} />)
            }
        </div>
    )
}

export default ShowDeets