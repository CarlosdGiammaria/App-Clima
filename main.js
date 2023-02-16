const form = document.querySelector(".js-form");
const containerWeather = document.querySelector(".js-weather-city");
const apiKey = "3d169feda7a066ff2b90a81de6a1f71e";

window.addEventListener("DOMContentLoaded", () => {
  getCoords();
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let city = formData.get("city");
    !city ? alert("BY ENTER A VALID VALUE") : getWeather(city);
  });
});

function getWeather(query, coords = {}) {
  const url = Object.keys(coords).length
    ? `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}`
    : `https://api.openweathermap.org/data/2.5/weather?q=${query}&lang=sp&appid=${apiKey}`;

  fetch(url)
    .then((rest) => rest.json())
    .then((data) => {
      console.log(data);
      showWheather(data);
      iconAccordingToWeather(data.weather[0].main.toLowerCase());
    })
    .catch((error) => {
      alert("OPSS, SITE NOT FOUND", error);
    });
}

function showWheather(country) {
  const [weather] = country.weather;
  const { speed } = country.wind;
  const { temp } = country.main;
  containerWeather.innerHTML = `

    <div class="container__weather-city ">
      <div class="weather-city__details">
        <span class="big-text"> ${toCelsius(temp)}º </span>
        <div class="wind">
          <span class="opaque-text">  ${weather.description}</span>
          <span class="opaque-text"><img src="./image/wind.png" class="small-icon"> ${speed}</span>
          <span>${country.name}</span>
        </div>
      </div>
      <div class="weather-city__img">
        <img src="" alt="" class="js-img"/>
        <span>${weather.main}</span>
      </div>
    </div>
    
  `;
}

function toCelsius(kelvin) {
  return Math.round(kelvin - 273.15);
}

function iconAccordingToWeather(icono) {
  const img = document.querySelector(".js-img");
  switch (icono) {
    case "clear":
      img.src = "image/clear.png";
      break;

    case "clouds":
      img.src = "image/cloud.png";
      break;

    case "rain":
      img.src = "image/rain.png";
      break;

    case "snow":
      img.src = "image/snow.png";
      break;

    case "thunderstorm":
      img.src = "image/thunderstorm.png";
      break;
  }
}

function getCoords() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lon = position.coords.longitude;
      const lat = position.coords.latitude;
      getWeather("", { lat, lon });
    });
  }
}
