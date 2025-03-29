# Weather App

## Overview
This Weather App is a web application that allows users to search for a city and retrieve real-time weather data along with its time zone. The application utilizes two external APIs:

- [OpenWeatherMap API](https://openweathermap.org/api) for weather data.
- [TimeZoneDB API](https://timezonedb.com/api) for time zone information.

The app is built using **HTML, CSS, and JavaScript** and provides an intuitive user experience with real-time weather updates.

## Features
- Search for any city worldwide to get live weather updates.
- Display current temperature, weather conditions, and humidity.
- Show the city's local time based on its time zone.
- Display weather icons that change based on the current weather conditions (e.g., sunny, cloudy, rainy).
- Indicate if it is raining or experiencing other weather conditions.
- Show wind speed in real-time.
- Responsive design for desktop and mobile users.

## Deployment
This application is deployed on two web servers and uses a load balancer to distribute traffic:

- **Web Server 1 (Web-01):** `44.212.32.161`
- **Web Server 2 (Web-02):** `54.205.34.198`
- **Load Balancer (Lb-01):** `44.201.224.249`

The app can also be accessed at: **[enock.tech](http://enock.tech)** (currently not secured, HTTPS will be added soon).

## Installation & Setup
To run the application locally:

1. Clone the repository:
   ```sh
   git clone https://github.com/enockmugisha1/Front-end-projects.git
   ```
2. Navigate to the project directory:
   ```sh
   cd weather-app
   ```
3. Open `whether.html` in your browser.

## API Usage & Acknowledgment
This project integrates two free and publicly available APIs:
- **[OpenWeatherMap API](https://openweathermap.org/api)** for real-time weather forecasts.
- **[TimeZoneDB API](https://timezonedb.com/api)** for time zone data.

A huge thanks to the developers of these APIs for making weather and time zone data accessible for free.

## Future Improvements
- Implement HTTPS for secure access.
- Enhance UI/UX with better design and animations.

## Contact
For any questions or feedback, feel free to reach out via email at **enock.mugisha2004@gmail.com**.
