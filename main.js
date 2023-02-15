const form = document.querySelector(".js-form");
const containerWeather = document.querySelector(".js-weather-city");
const apiKey = "3d169feda7a066ff2b90a81de6a1f71e";
const historyElement = document.querySelector(".js-history");
const btnShowHistory = document.querySelector(".js-btn-show-history");

const store = killa.createStore({ history: [] });

window.addEventListener("DOMContentLoaded", () => {
  loader();
  getCoords();

  store.subscribe((state) => {
    if (state.history.length >= 2) {
      btnShowHistory.classList.remove("hidden");
    }
  });
  (state) => state.history;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let formData = new FormData(e.target);
    let city = formData.get("city");

    !city ? alert("BY ENTER A VALID VALUE") : getWeather(city);
    form.reset();
  });

  btnShowHistory.addEventListener("click", (e) => {
    e.preventDefault();
    const state = store.getState();

    showHistory(state.history);
    btnShowHistory.classList.add("hidden");
  });
});

function getWeather(query, coords = {}) {
  const url = Object.keys(coords).length
    ? `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&lang=sp&appid=${apiKey}`
    : `https://api.openweathermap.org/data/2.5/weather?q=${query}&lang=sp&appid=${apiKey}`;

  fetch(url)
    .then((rest) => rest.json())
    .then((data) => {
      const icon = getIcon(data.weather[0].main.toLowerCase());
      saveHistory(data);

      const template = createTemplateWheather(data, icon);

      containerWeather.innerHTML = template;
    })
    .catch((error) => {
      console.log("error", error);
    });
}

function createTemplateWheather(country, icon) {
  const [weather] = country.weather;
  const { speed } = country.wind;
  const { temp } = country.main;

  return `
    <div class="container__weather-city ">
      <div class="weather-city__details">
        <span class="big-text"> ${toCelsius(temp)}º </span>
        <div class="wind">
          <span class="opaque-text">${weather.description}</span>
          <span class="opaque-text"><img src="./image/wind.png" class="small-icon"> ${speed}</span>
          <span class="bold-text">${country.name}</span>
        </div>
      </div>
      <div class="weather-city__img">
        <img src="${icon}" alt="" />
        <span class="bold-text">${weather.main}</span>
      </div>
    </div>
  `;
}

function saveHistory(data) {
  if (!data) return;

  const { history } = store.getState();

  store.setState(() => {
    return {
      history: [...history.filter((item) => item.id != data.id), data],
    };
  });
}

function showHistory(history) {
  const templates = history.reduce((acc, cur) => {
    const main = cur.weather[0].main;
    const icon = getIcon(main.toLowerCase());
    acc += createTemplateWheather(cur, icon);

    return acc;
  }, "");

  containerWeather.innerHTML = templates;
}

function toCelsius(kelvin) {
  return Math.round(kelvin - 273.15);
}

function getIcon(icono) {
  switch (icono) {
    case "clear":
      return "./image/clear.png";
    case "clouds":
      return "./image/cloud.png";
    case "rain":
      return "./image/rain.png";
    case "snow":
      return "./image/snow.png";
    case "thunderstorm":
      return "./image/thunderstorm.png";
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

function loader() {
  const loader = `<div class="spinner j-spinner"></div>`;
  containerWeather.innerHTML = loader;
}
