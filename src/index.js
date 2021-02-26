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

///////////CARDS /////////////////////

function formatHours(timestamp){
 
 let date = new Date(timestamp);
 let hours = date.getHours();

 let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
 
  return `${hours}:00`;




}

//////////////////////////////////////

//function dispalyForecast(response) {
 //let forecastElement = document.querySelector("#forecast");
 //forecastElement.innerHTML = null;
// let forecast = null;
//}

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

function showForecast(response){
  console.log(response.data);

////////// CARD 0 //////////
  document.querySelector ("#forecast-time-0").innerHTML = `${formatHours(response.data.list[0].dt_txt)}`;

//let forecastElement0 = document.querySelector("#");
//forecastElement0.innerHTML =`http://openweathermap.org/img/wn/${response.data.list[0].weather[0].icon}@2x.png"/>`;
//document.querySelector("#forecast-icon-0").innerHTML =`http://openweathermap.org/img/wn/${response.data.list[0].weather[0].icon}@2x.png"/>`;
let icon0 = response.data.list[0].weather[0].icon;
let weatherImage0 = document.querySelector("#forecast-icon-0");
weatherImage0.src = `http://openweathermap.org/img/wn/${icon0}@2x.png`;


document.querySelector("#forecast-temp-day-0").innerHTML =  `${Math.round(response.data.list[0].main.temp)} °C`;


////////// CARD 1 //////////
document.querySelector ("#forecast-time-1").innerHTML = `${formatHours(response.data.list[1].dt_txt)}`;

let icon1 = response.data.list[1].weather[0].icon;
let weatherImage1 = document.querySelector("#forecast-icon-1");
weatherImage1.src = `http://openweathermap.org/img/wn/${icon1}@2x.png`;

document.querySelector("#forecast-temp-day-1").innerHTML =  `${Math.round(response.data.list[1].main.temp)} °C`;



////////// CARD 2 //////////
document.querySelector ("#forecast-time-2").innerHTML = `${formatHours(response.data.list[2].dt_txt)}`;

let icon2 = response.data.list[2].weather[0].icon;
let weatherImage2 = document.querySelector("#forecast-icon-2");
weatherImage2.src = `http://openweathermap.org/img/wn/${icon2}@2x.png`;

document.querySelector("#forecast-temp-day-2").innerHTML =  `${Math.round(response.data.list[2].main.temp)} °C`;



////////// CARD 3 //////////
document.querySelector ("#forecast-time-3").innerHTML = `${formatHours(response.data.list[3].dt_txt)}` ;

let icon3 = response.data.list[3].weather[0].icon;
let weatherImage3 = document.querySelector("#forecast-icon-3");
weatherImage3.src = `http://openweathermap.org/img/wn/${icon3}@2x.png`;

document.querySelector("#forecast-temp-day-3").innerHTML =  `${Math.round(response.data.list[3].main.temp)} °C`;

////////// CARD 4 //////////
document.querySelector ("#forecast-time-4").innerHTML = `${formatHours(response.data.list[4].dt_txt)}`;

let icon4 = response.data.list[4].weather[0].icon;
let weatherImage4 = document.querySelector("#forecast-icon-4");
weatherImage4.src = `http://openweathermap.org/img/wn/${icon4}@2x.png`;

document.querySelector("#forecast-temp-day-4").innerHTML =  `${Math.round(response.data.list[4].main.temp)} °C`;

 


 }

function searchCity(city) {
  let apiKey = "bed7bbf48bd2b11ee968786fb7dfbba4";
  let units = "metric";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather?q=";
  let apiUrl = `${apiEndPoint}${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);


  apiUrl= `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);

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
 
  apiURL= `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apiKey}`;
  axios.get(apiURL).then(showForecast);
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