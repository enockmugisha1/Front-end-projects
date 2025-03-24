import { config } from "./config.js";

const searchBox = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherIcon = document.querySelector(".weather-icon");
const errorMessage = document.querySelector(".error-message");

async function checkWeather(city) {
    try {
        const response = await fetch(`${config.apiUrl}&q=${city}&appid=${config.apiKey}`);

        if (!response.ok) {
            throw new Error(`City not found!`);
        }

        const data = await response.json();
        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = `${Math.round(data.main.temp)}°C`;
        document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;
        document.querySelector(".wind").innerHTML = `${data.wind.speed} km/h`;
        document.querySelector(".description").innerHTML = data.weather[0].description;
        
        const iconCode = data.weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        
        errorMessage.innerHTML = ""; 
    } catch (error) {
        console.error("Error fetching weather data:", error);
        errorMessage.innerHTML = "City not found. Please try again!";
    }
}

async function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const response = await fetch(`${config.apiUrl}&lat=${latitude}&lon=${longitude}&appid=${config.apiKey}`);
            const data = await response.json();
            checkWeather(data.name);
        });
    } else {
        errorMessage.innerHTML = "Geolocation not supported";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

document.addEventListener("DOMContentLoaded", getUserLocation);
