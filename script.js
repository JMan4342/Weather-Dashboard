var apiKey = "f57bb5add0d36df3df9a18537e407ac9";

// Start search from clicking submit button
document.querySelector("#searchBtn").addEventListener("click", fetchLatLong);

// !!!!!!!!  NEED TO FIX  !!!!!!!!!!
// Start search from pressing enter key
// document
//   .querySelector(".cityQuery")
//   .addEventListener("keyup", function(event){
//     if (event.key === "Enter") {
//         fetchLatLong;}
//   });

// Capture latitude and longitude of city
function fetchLatLong(event) {
  var city = document.querySelector("#citySearch").value;
  fetch(
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
      city +
      "&appid=" +
      apiKey
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // Send lat and lon info to fetch weather
      fetchWeather(data);
      // Send data to save city in local
      saveCity(data);
    });
}

// !!!!!!!!  NEED TO FIX  !!!!!!!!!!
// Save city names in local storage and display on page
var savedCities = document.querySelector("#savedCities");
function saveCity(data) {
  var { name } = data[0];
//   const cityArray = JSON.parse(localStorage.getItem("searchedCity")) || [];
var cityArray = JSON.parse(localStorage.getItem("searchedCity")) || [];
if ( !cityArray.includes(name)) cityArray.push(name);

savedCities.innerHTML = "";
for (let i = 0; i < cityArray.length; i++) {
    var cityPar = document.createElement("p");
    let text = document.createTextNode(cityArray[i]);
    cityPar.appendChild(text);
    savedCities.appendChild(cityPar);
    
    
}
console.log(cityArray);
localStorage.setItem("searchedCity", JSON.stringify(cityArray));
}


// Capture current and forcast weather
function fetchWeather(data) {
  var { lat, lon } = data[0];
  var { name } = data[0];
  document.querySelector("#currentCity").innerText = name;

  console.log(lat, lon);

  fetch(
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      lat +
      "&lon=" +
      lon +
      "&exclude=minutely,hourly,alerts&units=imperial&appid=" +
      apiKey
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // Send to forcast function
      displayForcast(data);
      // Send to current weather function
      displayCurrent(data);
    });
}

function displayCurrent(data) {
  var { dt, temp, humidity, wind_speed, uvi } = data.current;
  var { icon } = data.current.weather[0];
  var date = new Date(dt * 1000);
  console.log(date);
  var formatDate =
    date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
  console.log(formatDate);

  console.log(temp, humidity, wind_speed, uvi, icon);

  document.querySelector("#currentDate").innerText = formatDate;
  document.querySelector("#currentIcon").src =
    "http://openweathermap.org/img/wn/" + icon + ".png";
  document.querySelector("#currentTemp").innerHTML = temp + "&#8457;";
  document.querySelector("#currentHumid").innerText =
    "Humidity: " + humidity + "%";
  document.querySelector("#currentWindSpeed").innerText =
    "Wind Speed: " + wind_speed + " MPH";
  document.querySelector("#currentUVI").innerText = "UV Inded: " + uvi;
}

// Display 5-day forcast
function displayForcast(data) {

  //   Pull five days worth of data from API
  var multiDayForcast = document.querySelector("#multiDayForcast");
  multiDayForcast.innerHTML = "";
  for (let i = 0; i < 5; i++) {
    var { dt, humidity, wind_speed } = data.daily[i];
    var { icon } = data.daily[i].weather[0];
    var { max, min } = data.daily[i].temp;
    var date = new Date(dt * 1000);

    //   Format date from Unix format
    var formatDate =
      date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
    console.log(formatDate);

    // Display forcast weather in browswer
    var forcastDate = document.createElement("p");
    forcastDate.innerText = formatDate;
    var forcastIcon = document.createElement("img");
    forcastIcon.src = "http://openweathermap.org/img/wn/" + icon + ".png";
    var forcastTempHigh = document.createElement("p");
    forcastTempHigh.innerHTML = "High: " + max + "&#8457;";
    var forcastTempLow = document.createElement("p");
    forcastTempLow.innerHTML = "Low: " + min + "&#8457;";
    var forcastHumid = document.createElement("p");
    forcastHumid.innerText = "Humidity: " + humidity + "%";
    var forcastWindSpeed = document.createElement("p");
    forcastWindSpeed.innerText = "Wind Speed: " + wind_speed + " MPH";

    multiDayForcast.append(
      forcastDate,
      forcastIcon,
      forcastTempHigh,
      forcastTempLow,
      forcastHumid,
      forcastWindSpeed
    );

    console.log(max, min, humidity, wind_speed, icon);
  }
}
