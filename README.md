# Weather App

## Overview
The Weather App is a web application designed to provide real-time weather updates and local time information for any city worldwide. It integrates two external APIs to deliver accurate and up-to-date weather and time zone data:

- **[OpenWeatherMap API](https://openweathermap.org/api)** – Provides real-time weather data.
- **[TimeZoneDB API](https://timezonedb.com/api)** – Retrieves the local time based on the city's time zone.

Built using **HTML, CSS, and JavaScript**, the application offers an intuitive user experience with real-time updates and a responsive design.

## Features
- Search for any city worldwide to obtain live weather updates.
- Display current temperature, weather conditions, and humidity.
- Show the city's local time based on its time zone.
- Display dynamic weather icons corresponding to current conditions (e.g., sunny, cloudy, rainy).
- Indicate special weather conditions such as rain or storms.
- Display real-time wind speed.
- Fully responsive design optimized for desktop and mobile users.

## Deployment
The application is deployed across two web servers, with a load balancer ensuring efficient traffic distribution. The load balancer is secured and accessible via HTTPS.

- **Web Server 1 (Web-01):** `44.212.32.161`
- **Web Server 2 (Web-02):** `54.205.34.198`
- **Load Balancer (Lb-01):** `44.201.224.249`

### Access the Application
You can access the Weather App securely via HTTPS:

➡️ **[https://www.enock.tech/](https://www.enock.tech/)**

## Installation & Setup
To run the application locally, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/enockmugisha1/Front-end-projects.git
   ```
2. Navigate to the project directory:
   ```sh
   cd weather-app
   ```
3. Ensure you have API keys from OpenWeatherMap and TimeZoneDB. Create a configuration file (`config.js`) to store them securely:
   ```js
   // config.js (Not included in the repository for security reasons)
   const API_KEYS = {
       weather: "YOUR_OPENWEATHERMAP_API_KEY",
       timezone: "YOUR_TIMEZONEDB_API_KEY"
   };
   ```
4. Open `whether.html` in your web browser.

## API Usage & Acknowledgment
This project leverages two publicly available APIs:
- **[OpenWeatherMap API](https://openweathermap.org/api)** – Provides real-time weather forecasts.
- **[TimeZoneDB API](https://timezonedb.com/api)** – Retrieves time zone data.

A special thanks to the developers of these APIs for making real-time weather and time zone data accessible.

## Contact
For any inquiries or feedback, feel free to reach out via email at **enock.mugisha2004@gmail.com** or **e.mugisha4@alustudent.com**.


