// Define constants
const API_KEY = '13a1560792d75cb19c37406187f80966'; //Api Key used
const weatherForm = document.getElementById('city-search-form');
const cityInput = document.getElementById('city-input');
const cityNameElement = document.getElementById('city-name');
const dateElement = document.getElementById('date');
const weatherIconElement = document.getElementById('weather-icon');
const temperatureElement = document.getElementById('temperature');
const humidityElement = document.getElementById('humidity');
const windSpeedElement = document.getElementById('wind-speed');
const forecastListElement = document.getElementById('forecast-list');
const searchHistoryList = document.getElementById('search-history-list');


weatherForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const cityName = cityInput.value;

    // Fetch current weather data
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            // Update current weather information
            cityNameElement.textContent = `City: ${data.name}`;
            dateElement.textContent = `Date: ${new Date(data.dt * 1000).toLocaleDateString()}`;
            weatherIconElement.textContent = `Icon: ${data.weather[0].main}`;
            temperatureElement.textContent = `Temperature: ${data.main.temp}°C`;
            humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
            windSpeedElement.textContent = `Wind Speed: ${data.wind.speed} m/s`;

            // Add the city to the search history
            const searchHistoryItem = document.createElement('li');
            searchHistoryItem.textContent = data.name;
            searchHistoryList.appendChild(searchHistoryItem);

            // Fetch 5-day forecast
            fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}`)
                .then(response => response.json())
                .then(forecastData => {
                    forecastListElement.innerHTML = ''; // Clear previous forecast data

                    // Display the 5-day forecast
                    for (let i = 0; i < 5; i++) {
                        const forecast = forecastData.list[i * 8]; // Data every 8 hours
                        const forecastItem = document.createElement('div');
                        forecastItem.className = 'forecast-item';
                        forecastItem.textContent = `
                            Date: ${new Date(forecast.dt * 1000).toLocaleDateString()}
                            Icon: ${forecast.weather[0].main}
                            Temperature: ${forecast.main.temp}°C
                            Wind Speed: ${forecast.wind.speed} m/s
                            Humidity: ${forecast.main.humidity}%
                        `;
                        forecastListElement.appendChild(forecastItem);
                    }
                })
                .catch(error => console.error('Error fetching forecast data: ', error));
        })
        .catch(error => console.error('Error fetching current weather data: ', error));
});
