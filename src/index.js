let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let currentDay = days[now.getDay()];
let currentHour = now.getHours();
let currentMinute = now.getMinutes();

let todayDate = document.querySelector("#todayDate");
todayDate.innerHTML = `${currentDay} ${currentHour}:${currentMinute}`;

function showTemp(response) {
  console.log(response);
  let currentTemp = document.querySelector("#currentTemp");
  currentTemp.innerHTML = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#location");
  cityElement.innerHTML = response.data.name;
  // document.querySelector(".weatherDescription").innerHTML =
  // response.data.weather[0].description;
}
function searchCity(city) {
  let apiKey = "bed7bbf48bd2b11ee968786fb7dfbba4";
  let units = "metric";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather?q=";
  let apiUrl = `${apiEndPoint}${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}
function handleCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city-demand");
  let location = document.querySelector("#location");
  location.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleCity);

function showMyPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "bed7bbf48bd2b11ee968786fb7dfbba4";
  let units = "metric";
  let apiAdress = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiAdress}lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}
function currentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showMyPosition);
}
let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", currentPosition);
