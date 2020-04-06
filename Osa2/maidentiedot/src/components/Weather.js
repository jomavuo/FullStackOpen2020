import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Icons from './Icons';

const Weather = ({ capital }) => {
    const [weather, setWeather] = useState({
        location: null,
        temp: null,
        icons: [],
        wind: null,
        windDir: null
    })
    useEffect(() => {
        const api_key = process.env.REACT_APP_API_KEY
        console.log('effect called');

        axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
            .then((response) => {
                let data = response.data
                setWeather({
                    location: data.location.name,
                    temp: data.current.temperature,
                    icons: data.current.weather_icons,
                    wind: data.current.wind_speed,
                    windDir: data.current.wind_dir
                })
            })
    }, [capital])


    if (weather.location === null || weather.temp === null ||
        weather.icons === [] || weather.wind === null || weather.windDir === null) {
            
        console.log('Weather data not yet received');

        return (
            <>
                <p>Loading...</p>
            </>
        )
    } else {
        console.log('Weather data received');

        return (
            <>
                <h2>Weather in {weather.location}</h2>
                <p><strong>Temperature: </strong>{weather.temp} Celsius</p>
                {weather.icons.map((icon =>
                    <Icons key={weather.icons.indexOf(icon)} src={icon} />))}
                <p><strong>wind: </strong>{weather.wind} mph direction {weather.windDir}</p>
            </>
        )
    }
}


export default Weather