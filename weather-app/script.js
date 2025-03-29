import { config } from "./config.js";

// DOM Elements
const searchBox = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherIcon = document.querySelector(".weather-icon");
const errorMessage = document.querySelector(".error-message");
const loader = document.getElementById("loader");
const weatherDisplay = document.getElementById("weather-display");
const localTimeDisplay = document.getElementById("local-time");
const tempElement = document.querySelector(".temp");
const unitElement = document.querySelector(".unit");
const unitButtons = document.querySelectorAll(".unit-btn");

// State
let isCelsius = true;
let weatherCache = {};
const CACHE_EXPIRY = 30 * 60 * 1000; // 30 minutes

// Weather background images mapping
const weatherBackgrounds = {
    clear: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1530908295418-a12e326966ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
    clouds: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
    rain: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1438449805896-28a668819c2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
    drizzle: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1438449805896-28a668819c2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
    thunderstorm: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1507334446580-64b6b38d4b3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
    snow: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1491002052546-bf38f186af56?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
    default: "#222"
};

// Initialize the app
document.addEventListener("DOMContentLoaded", () => {
    setupEventListeners();
    getUserLocation();
});

function setupEventListeners() {
    // Search button click event
    searchBtn.addEventListener("click", handleSearch);
    
    // Enter key press event
    searchBox.addEventListener("keypress", (e) => {
        if (e.key === "Enter") handleSearch();
    });
    
    // Unit toggle events
    unitButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Update active state
            unitButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            
            // Convert temperature units
            isCelsius = button.dataset.unit === "celsius";
            updateTemperatureUnits();
        });
    });
}

async function handleSearch() {
    const city = searchBox.value.trim();
    
    // Input validation
    if (!city) {
        showError("Please enter a city name");
        return;
    }
    
    await checkWeather(city);
}

async function checkWeather(city) {
    try {
        showLoader(true);
        clearError();
        
        // Check cache first
        const cachedData = getFromCache(city);
        if (cachedData) {
            updateUI(cachedData);
            showLoader(false);
            return;
        }
        
        // Fetch from API
        const response = await fetch(`${config.apiUrl}&q=${city}&appid=${config.apiKey}`);
        
        if (!response.ok) {
            throw new Error(response.status === 404 ? "City not found!" : "Failed to fetch weather data");
        }
        
        const data = await response.json();
        
        // Cache the data
        addToCache(city, data);
        
        // Update UI with new data
        updateUI(data);
        
        // Update background based on weather
        updateBackground(data.weather[0].main.toLowerCase());
        
        // Get local time for the city
        await displayLocalTime(data.coord.lat, data.coord.lon);
        
    } catch (error) {
        console.error("Error fetching weather data:", error);
        showError(error.message);
    } finally {
        showLoader(false);
    }
}

function updateUI(data) {
    document.querySelector(".city").textContent = data.name;
    document.querySelector(".description").textContent = data.weather[0].description;
    document.querySelector(".humidity").textContent = `${data.main.humidity}%`;
    document.querySelector(".wind").textContent = `${data.wind.speed} km/h`;
    
    // Update temperature based on current unit
    const temp = isCelsius ? data.main.temp : celsiusToFahrenheit(data.main.temp);
    tempElement.innerHTML = `${Math.round(temp)}<span class="unit">${isCelsius ? '°C' : '°F'}</span>`;
    
    // Update weather icon
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherIcon.alt = data.weather[0].description;
    
    // Show weather display
    weatherDisplay.style.display = "block";
}

function updateTemperatureUnits() {
    const tempElements = document.querySelectorAll(".temp");
    tempElements.forEach(el => {
        const currentTemp = parseFloat(el.textContent);
        if (!isNaN(currentTemp)) {
            const convertedTemp = isCelsius ? 
                fahrenheitToCelsius(currentTemp) : 
                celsiusToFahrenheit(currentTemp);
            el.innerHTML = `${Math.round(convertedTemp)}<span class="unit">${isCelsius ? '°C' : '°F'}</span>`;
        }
    });
}

async function displayLocalTime(lat, lon) {
    try {
        const timezoneResponse = await fetch(`https://api.timezonedb.com/v2.1/get-time-zone?key=${config.timezoneApiKey}&format=json&by=position&lat=${lat}&lng=${lon}`);
        const timezoneData = await timezoneResponse.json();
        
        if (timezoneData.status === "OK") {
            const localTime = new Date(timezoneData.formatted);
            const options = { 
                weekday: 'long', 
                hour: '2-digit', 
                minute: '2-digit', 
                timeZone: timezoneData.zoneName 
            };
            localTimeDisplay.textContent = localTime.toLocaleTimeString('en-US', options);
        }
    } catch (error) {
        console.error("Error fetching local time:", error);
        localTimeDisplay.textContent = "";
    }
}

function updateBackground(weatherCondition) {
    const body = document.body;
    const background = weatherBackgrounds[weatherCondition] || weatherBackgrounds.default;
    body.style.backgroundImage = background;
}

async function getUserLocation() {
    if (!navigator.geolocation) {
        showError("Geolocation is not supported by your browser");
        checkWeather("London"); // Default city
        return;
    }
    
    try {
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
                timeout: 10000,
                maximumAge: 60000
            });
        });
        
        const { latitude, longitude } = position.coords;
        const response = await fetch(`${config.apiUrl}&lat=${latitude}&lon=${longitude}&appid=${config.apiKey}`);
        
        if (!response.ok) {
            throw new Error("Failed to fetch weather for your location");
        }
        
        const data = await response.json();
        checkWeather(data.name);
    } catch (error) {
        console.error("Geolocation error:", error);
        showError("Unable to retrieve your location. Showing default weather.");
        checkWeather("London"); // Default city
    }
}

function showLoader(show) {
    loader.style.display = show ? "block" : "none";
    weatherDisplay.style.display = show ? "none" : "block";
}

function showError(message) {
    errorMessage.textContent = message;
    weatherDisplay.style.display = "none";
}

function clearError() {
    errorMessage.textContent = "";
}

function celsiusToFahrenheit(c) {
    return (c * 9/5) + 32;
}

function fahrenheitToCelsius(f) {
    return (f - 32) * 5/9;
}

function addToCache(city, data) {
    weatherCache[city.toLowerCase()] = {
        data: data,
        timestamp: Date.now()
    };
}

function getFromCache(city) {
    const cached = weatherCache[city.toLowerCase()];
    if (cached && (Date.now() - cached.timestamp) < CACHE_EXPIRY) {
        return cached.data;
    }
    return null;
}