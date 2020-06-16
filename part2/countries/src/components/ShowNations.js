import React, { useState, useEffect } from 'react'
import axios from 'axios'
import OneCountry from './OneCountry.js'

const ShowNations = (props) => {
    const query = props.query
    const [finalList, SetList] = useState([])
    const ShowCountry = (props) => {
        return (
            <div>
                <form onSubmit={(event) => searchClicked(props.country, event)}>
                    <p>{props.country}</p>
                    <button type="submit" style={{ float: "right" }}>add</button>
                </form>
            </div>
        )
    }
    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                const jsondata = response.data
                let templist = []
                for (var i = 0; i < jsondata.length; i++) {
                    if (jsondata[i].name.toLowerCase().includes(query.toLowerCase())) {
                        templist.push(jsondata[i].name);
                    }
                }
                SetList(templist)
            })
    }, [query])
    const [countryDeets, SetDeets] = useState({})
    useEffect(() => {
        if (finalList.length == 1) {
            axios
                .get('https://restcountries.eu/rest/v2/all')
                .then(response => {
                    console.log("called")
                    const jsondata = response.data
                    for (var i = 0; i < jsondata.length; i++) {
                        if (jsondata[i].name === finalList[0]) {
                            console.log("hmm", jsondata[i].name)
                            return (
                                SetDeets({
                                    name: jsondata[i].name, capital: jsondata[i].capital, population: jsondata[i].population,
                                    languages: jsondata[i].languages, flag: jsondata[i].flag
                                }
                                )
                            )
                        }
                    }
                })
        }
    }, [finalList])
    const searchClicked = (country, event) => {
        event.preventDefault()
        SetList([country])
    }
    if (finalList.length > 10) {
        return (
            <div>
                <p>Too many queries. Be more specific.</p>
            </div>
        )
    }
    if (finalList.length == 1) {
        return (
            <OneCountry name={countryDeets.name} capital={countryDeets.capital} population={countryDeets.population} flag={countryDeets.flag} />
        )
    }
    return (
        <div>
            <div>
                {finalList.map(name =>
                    <ShowCountry key={name} country={name} />
                )}
            </div>
        </div>
    )

}

export default ShowNations