function currentDate(timestamp) {
  let now = new Date(timestamp);
  let hours = now.getHours();
  console.log(hours);
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  return `Last updated: ${day} ${hours}:${minutes}`;
}
function formatDay(timestamp) {
  let forecastDate = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = forecastDate.getDay();
  return days[day];
}
function showForecast(response) {
  console.log(response.data);
  console.log(response.data.daily);
  let foreCast = response.data.daily;
  let foreCastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Wednesday", "Thursday", "Friday", "Saturday"];
  foreCast.forEach(function (foreCastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
                <div class="forecast-date">${formatDay(foreCastDay.dt)}</div>
                <img
                  src="http://openweathermap.org/img/wn/${
                    foreCastDay.weather[0].icon
                  }@2x.png"
                  alt=""
                  width="40px"
                />
                <div class="forecast-temp" id="forecast-temp">
                  <span class="forecast-max">${Math.round(
                    foreCastDay.temp.max
                  )}</span>
                  <span class="forecast-min">${Math.round(
                    foreCastDay.temp.min
                  )}</span>
              </div>
            </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  foreCastElement.innerHTML = forecastHTML;
}
function getForeCast(coordinates) {
  console.log(coordinates);
  let apiKey = "f4f7afef9c2df741d794fbe9111a24ca";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showForecast);
}

function showTemperature(response) {
  console.log(response.data);
  let tempElement = document.querySelector("#current-temp");
  tempElement.innerHTML = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let feelsElement = document.querySelector("#feels-like");
  feelsElement.innerHTML = Math.round(response.data.main.feels_like);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let dateElement = document.querySelector("#date-time");
  dateElement.innerHTML = currentDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  celciusTemp = response.data.main.temp;

  getForeCast(response.data.coord);
}

function citySearch(city) {
  let apiKey = "f4f7afef9c2df741d794fbe9111a24ca";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");

  citySearch(city.value);
}
citySearch("london");
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function toFahr(event) {
  event.preventDefault();
  let fahrTemp = (celciusTemp * 9) / 5 + 32;
  let tempElement = document.querySelector("#current-temp");
  tempElement.innerHTML = Math.round(fahrTemp);
}
function toCelcius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#current-temp");
  tempElement.innerHTML = Math.round(celciusTemp);
}

let celciusTemp = null;
let fahrChange = document.querySelector("#fahr-link");
fahrChange.addEventListener("click", toFahr);

let celciusChange = document.querySelector("#celcius-link");
celciusChange.addEventListener("click", toCelcius);
