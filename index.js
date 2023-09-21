// get the geo-coordinates of entered city because it is requiredto ge weather details step 1
const searchButton = document.querySelector(".search-btn");
const cityInput = document.querySelector(".city-input");
const locationButton = document.querySelector(".location-btn")
const weatherCardsDiv = document.querySelector(".weather-cards")
const currentWeatherDiv = document.querySelector(".current-weather")


const API_KEY = "0c6c7c6766f0c82e84b46a07f2439d14"; //  OpenWeatherMap API key

const getWeatherDetails = (cityName, lat, lon) => {
    const Weather_API_URL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`

    // API returns us the forecast after a gap of 3 hours.
    fetch(Weather_API_URL).then(res => res.json()).then(data => {
        const uniqueForecastDays = [];
        console.log(data)

      const fiveDaysForecast =  data.list.filter(forecast => {
            const forecastDate = new Date(forecast.dt_txt).getDate();
            console.log(forecastDate)
            if(!uniqueForecastDays.includes(forecastDate)) {
            return    uniqueForecastDays.push(forecastDate)
            }
        })
        console.log(fiveDaysForecast)
        fiveDaysForecast.forEach(weatherItem => {
            createWeatherCard();
        })
    }).catch(() => {
        alert("An error occured while fetchig the weather forcast!")
    })
}

// function to get city coordinaates
const getCityCoordinates = () => {
    const cityName = cityInput.value.trim() 
    if(!cityName) return;    
    console.log(cityName)
    const GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}=&limit=1&appid=${API_KEY}`

    // entered city coordinates (latitude, longitude, and name) from the API response
    fetch(GEOCODING_API_URL).then(res => res.json()).then(data => {
        if(!data.length) return alert(`No coordinates found for ${cityName}`)
        const { name, lat, lon } = data[0];
    getWeatherDetails(name, lat, lon);
    }).catch(() => {
        alert("Error occurred while fetching the coordinates!")
    })

}

searchButton.addEventListener("click", getCityCoordinates)