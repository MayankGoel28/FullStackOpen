import React, { useState, useEffect } from 'react'
import axios from 'axios'

const OneCountry = ({ name, capital = 'kabul', population, languages = "", flag }) => {
    const api_key = process.env.REACT_APP_API_KEY
    const [weather, SetWeather] = useState({})
    useEffect(() => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
            .then(response => {

                console.log('hey', response.data.current.temperature)
                return (
                    SetWeather({
                        temperature: response.data.current.temperature,
                        icon: response.data.current.weather_icons,
                        wind_speed: response.data.current.wind_speed,
                        wind_dir: response.data.current.wind_dir
                    })

                )

            })
    }, [api_key, capital])
    const ShowWeather = () => {
        return (
            <div>
                <b>Weather in {capital ? capital : null}</b>
                <p>temperature: {weather.temperature ? weather.temperature : null} celsius</p>
                <img src={weather.icon ? weather.icon : null} alt="icon"></img>
                <p>wind: {weather.wind_speed ? weather.wind_speed : null} mph in direction {weather.wind_dir ? weather.wind_dir : null}</p>
            </div>
        )
    }
    const EachLanguage = ({ name }) => {
        return (
            <React.Fragment>
                <li>{name}</li>
            </React.Fragment>
        )
    }

    let id = 0
    if (capital === "") {
        return null
    }
    return (
        <div>
            <br></br>
            <b>{name}</b>
            <p>capital {capital}</p>
            <p>population {population}</p>
            <b>Languages</b>
            <ul>
                {Object.entries(languages).map(language => <EachLanguage name={String(language[1].name)} key={id++} />
                )}
            </ul>
            <img src={String(flag)} alt="Flag" width="300"></img>
            <ShowWeather />
        </div>
    )
}

export default OneCountry;