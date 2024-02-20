import { useState } from "react"
import dotenv from 'dotenv'
dotenv.config()

export const WeatherApp = () => {

    const Url = `https://api.openweathermap.org/data/2.5/weather`
    const API_KEY = process.env.API_KEY
    const temperatureDiff = 273.15 //difference between kelvin and centigrade degree

    const [city, setCity] = useState('')
    const [weatherData, setWeatherData] = useState(null)

    const handleCityChange = (e) => {
        setCity(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (city.length > 0) fetchClima()
    }
    const fetchClima = async () => {
        try {
            const response = await fetch(`${Url}?q=${city}&appid=${API_KEY}`)
            const data = await response.json()
            setWeatherData(data)
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <div className="container">
            <h1>Weather app </h1>

            <form onSubmit={handleSubmit}>
                <input type="text"
                    value={city}
                    onChange={handleCityChange} />

                <button type="submit">Search</button>
            </form>

            {
                weatherData && (
                    <div>
                        <h2>{weatherData.name}</h2>
                        <p>Temperature: {parseInt(weatherData?.main?.temp - temperatureDiff)}°C</p>
                        <p>Weather condition: {weatherData.weather[0].description}</p>
                        <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}/>
                    </div>
                )
            }
        </div>
    )
}

