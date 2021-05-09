console.log('Client side javascript file is loaded!')




const form = document.querySelector('form');
form.addEventListener('submit', e => {
    e.preventDefault();
    const searchInput = document.getElementById('address-input');
    const address = searchInput.value;
    fetch(
        `/weather?address=${address}`
    )
        .then(resp => resp.json())
        .then(resp => renderForecast(resp.forecast));
})


const renderForecast = (forecastData) => {
    const wrapper = document.querySelector('.forecast-wrapper');

    wrapper.innerHTML = `
        <h2>Forecast:</h2>
        <div class="forecast-img-wrapper">
            <img src="${forecastData.current.weather_icons[0]}" alt="weather">
            <p class="temperature" id="msg-temp">${forecastData.current.temperature}<span>&deg;C</span></p>
        </div>
        <div class="weather-info">
            <p class="weather-description" id="msg-description">Weather: <span>${forecastData.current.weather_descriptions[0]}</span></p>
            <p>Wind speed: <span>${forecastData.current.wind_speed}</span>kph</p>
        </div>
    `;
}