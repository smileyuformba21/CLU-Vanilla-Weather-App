let now = new Date();
let hours = now.getHours;
console.log(hours);
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
}

let apiKey = "f4f7afef9c2df741d794fbe9111a24ca";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=london&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTemperature);
