const input = document.querySelector(".js-city");

window.addEventListener("DOMContentLoaded", () => {

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lon = position.coords.longitude;
      const lat = position.coords.latitude;
      const apiKey = "3d169feda7a066ff2b90a81de6a1f71e";
      const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

      console.log(url);
    });
  }
});
