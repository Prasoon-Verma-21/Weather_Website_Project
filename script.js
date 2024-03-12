document.addEventListener('DOMContentLoaded', function() {
    const apiKey = '2287c23b19b3af1fb19aee11aa4598d3'; // Replace with your API key

    document.getElementById('search-button').addEventListener('click', function() {
        const city = document.getElementById('city-input').value.trim();
        if (city) {
            fetchWeather(city);
        }
    });

    function fetchWeather(city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                displayWeather(data);
            })
            .catch(error => {
                console.error('There was a problem fetching the weather data:', error);
            });
    }

    function displayWeather(data) {
        const location = data.name;
        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

        document.querySelector('.location').textContent = location;
        document.querySelector('.temperature').textContent = `${temperature}°C`;
        document.querySelector('.description').textContent = description;
        document.querySelector('.icon').innerHTML = `<img src="${icon}" alt="Weather Icon">`;
    }
});
