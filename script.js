const container = document.querySelector('.container');
const search = document.querySelector('.search-bar button');
const weatherBar = document.querySelector('.weather-box'); // Corrected selector
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const inputField = document.querySelector('.search-bar input'); // Reference to the input field

search.addEventListener('click', () => {
    fetchWeather();
});

// Add event listener for the Enter key
inputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        fetchWeather();
    }
});

function fetchWeather() {
    const APIKey = '34391ca8a6ffae618f48fcbe9d9a0231';
    const city = inputField.value;

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBar.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main.toLowerCase()) {
                case 'clear':
                    image.src = 'Images/clear.png';
                    break;
                case 'rain':
                    image.src = 'Images/rain.png';
                    break;
                case 'clouds':
                    image.src = 'Images/cloud.png';
                    break;
                case 'snow':
                    image.src = 'Images/snow.png';
                    break;
                case 'haze':
                    image.src = 'Images/haze.png';
                    break;
                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)} <span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)} km/h`;

            weatherBar.style.display = 'block';
            weatherDetails.style.display = 'flex';
            weatherBar.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';
        });
}