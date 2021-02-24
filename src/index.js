///////TIME AND DATE /////////////

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
if (currentMinute < 10) {
  currentMinute = `0${currentMinute}`;
}

let todayDate = document.querySelector("#todayDate");
todayDate.innerHTML = `${currentDay} ${currentHour}:${currentMinute}`;


//////////////////////////////////////

//function dispalyForecast(response) {
 // let forecastElement = document.querySelector("#forecast");
 // forecastElement.innerHTML = null;
 // let forecast = null;


 ///////Weather Descriptions///////////////
function showTemp(response) {
  console.log(response);
  let currentTemp = document.querySelector("#currentTemp");
  let cityElement = document.querySelector("#location");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector ("#humidity");
  let windElement = document.querySelector("#wind");

  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  currentTemp.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  windElement.innerHTML = Math.round(response.data.wind.speed);

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}



////////////////////////////////////////
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

////////// CURRENT LOCATION ///////////
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

//// CELSIUS AND FAHRENHEIT///////
function displayFahrenheitTemperature(event) {
  event.preventDefault(); 
  
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
 
  let temperatureElement = document.querySelector("#currentTemp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
 
  
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#currentTemp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celcius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);



searchCity("Zhengzhou");