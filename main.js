const form = document.querySelector(".js-form");
const containerWeather = document.querySelector(".js-weather-city");

window.addEventListener("DOMContentLoaded", () => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let city = formData.get("city");
    !city ? alert("BY ENTER A VALID VALUE") : getCountry(city);
  });
});

function getCountry(country) {
  const apiKey = "3d169feda7a066ff2b90a81de6a1f71e";
  const url2 = `https://api.openweathermap.org/data/2.5/weather?q=${country}&lang=sp&appid=${apiKey}`;

  fetch(url2)
    .then((rest) => rest.json())
    .then((data) => {
      console.log(data);
      showWheather(data);
    })
    .catch((error) => {
      console.error("Error:", error);
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
          <span class="opaque-text"><img src="./image/wind.png" alt="" class="small-icon"> ${speed}</span>
          <span>${country.name}</span>
        </div>
      </div>
      <div class="weather-city__img">
        <img src="image/Group-53.png" alt="" />
        <span>${weather.main}</span>
      </div>
    </div>
    
  `;
}

function toCelsius(kelvin) {
  return Math.round(kelvin - 273.15);
}
