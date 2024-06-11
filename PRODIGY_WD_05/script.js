document.getElementById('search-button').addEventListener('click', function () {
    var cityName = document.getElementById('city-input').value;
    console.log(`City input: ${cityName}`);
    if (cityName) {
        fetchWeather(cityName);
    } else {
        alert('Please enter a city name.');
    }
});

function fetchWeather(city) {
    var apiKey = '931f131dde3f4ae2fcbc3289fc646471'; 
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    console.log(`Fetching weather for: ${city}`);
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(`API response:`, data);
            if (data.cod === 200) {
                displayWeather(data);
            } else {
                alert('City not found');
            }
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
            alert('An error occurred while fetching the weather data.');
        });
}

function displayWeather(data) {
    console.log(`Displaying weather data:`, data);
    var weatherResult = document.getElementById('weather-result');
    if (weatherResult) {
        weatherResult.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
        console.log('Weather data displayed successfully.');
    } else {
        console.error('Error: weather-result element not found.');
    }
}
