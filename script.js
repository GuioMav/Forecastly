const container = document.querySelector('.container');
const search = document.querySelector('.search-bar button');
const weatherBar = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const inputField = document.querySelector('.search-bar input');

// New function to change the background image based on the weather condition
function changeBackgroundImage(weather) {
    const body = document.querySelector('body');
    let imageUrl = '';

    switch (weather) {
        case 'Clear':
            imageUrl = 'https://plus.unsplash.com/premium_photo-1694475158551-73a74cac0cb5?q=80&w=2946&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'; // Change path as needed
            break;
        case 'Clouds':
            imageUrl = 'https://images.unsplash.com/photo-1647792381514-3c87dce61e6f?q=80&w=2831&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
            break;
        case 'Rain':
            imageUrl = 'https://images.unsplash.com/photo-1468476396571-4d6f2a427ee7?q=80&w=3079&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
            break;
        case 'Snow':
            imageUrl = 'https://images.unsplash.com/photo-1491864483946-1f06be97b71d?q=80&w=2944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
            break;
        case 'Mist':
            imageUrl = 'https://images.unsplash.com/photo-1526638684360-95cdcee762ce?q=80&w=2962&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
            break;
        default:
            imageUrl = 'https://images.unsplash.com/photo-1525011268546-bf3f9b007f6a?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    }

    body.style.backgroundImage = `url(${imageUrl})`;
}

// Event listener for the search button
search.addEventListener('click', () => {
    fetchWeather();
});

// Add event listener for Enter key
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
            const weatherCondition = json.weather[0].main;

            // Change background image based on the weather condition
            changeBackgroundImage(weatherCondition);

            switch (weatherCondition.toLowerCase()) {
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
                case 'mist':
                    image.src = 'Images/mist.png';
                    break;
                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)} <span>°C</span>`;
            description.innerHTML = json.weather[0].description;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)} km/h`;

            weatherBar.style.display = 'block';
            weatherDetails.style.display = 'flex';
            weatherBar.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';
        });
}