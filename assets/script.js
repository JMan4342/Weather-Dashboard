var apiKey = "f57bb5add0d36df3df9a18537e407ac9";
var cityArray = JSON.parse(localStorage.getItem("searchedCity")) || [];

// Start search from clicking submit button
document.querySelector("#searchBtn").addEventListener("click", fetchLatLong);

// Capture latitude and longitude of city
function fetchLatLong(event) {
  var city = document.querySelector("#citySearch").value;
  fetch(
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
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

// Retrieve weather data from saved cities
function fetchLatLong2(event) {
  var savedCity = document.querySelector("#savedCities").value;
  fetch(
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
      event.target.innerHTML +
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

// Save city names in local storage
var savedCities = document.querySelector("#savedCities");
function saveCity(data) {
  var { name } = data[0];
  if (!cityArray.includes(name)) cityArray.push(name);
  renderSearched();
  localStorage.setItem("searchedCity", JSON.stringify(cityArray));
}

// Append saved search cities, and retrieve weather data.
function renderSearched() {
  savedCities.innerHTML = "";
  for (let i = 0; i < cityArray.length; i++) {
    var cityPar = document.createElement("p");
    let text = document.createTextNode(cityArray[i]);
    cityPar.appendChild(text);
    savedCities.appendChild(cityPar);
    cityPar.addEventListener("click", fetchLatLong2);
  }
}
renderSearched();

// Clear saved cities.
var clearSaved = document.querySelector("#clearSaved");
clearSaved.addEventListener("click", function (e) {
  localStorage.clear();
  savedCities.innerHTML = "";
});

// Capture current and forcast weather
function fetchWeather(data) {
  var { lat, lon } = data[0];
  var { name } = data[0];
  document.querySelector("#currentCity").innerText = name;

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

// Display current weather.
function displayCurrent(data) {
  var { dt, temp, humidity, wind_speed, uvi } = data.current;
  var { icon } = data.current.weather[0];
  var date = new Date(dt * 1000);
  var formatDate =
    date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();

  document.querySelector("#currentDate").innerText = formatDate;
  document.querySelector("#currentIcon").src =
    "http://openweathermap.org/img/wn/" + icon + ".png";
  document.querySelector("#currentTemp").innerHTML = temp + "&#8457;";
  document.querySelector("#currentHumid").innerText =
    "Humidity: " + humidity + "%";
  document.querySelector("#currentWindSpeed").innerText =
    "Wind Speed: " + wind_speed + " MPH";
  document.querySelector("#currentUVI").innerText = "UV Index: " + uvi;

  if (uvi < 3) {
    document.querySelector("#currentUVI").style.backgroundColor = "green";
  }
  if (uvi > 2 && uvi < 6) {
    document.querySelector("#currentUVI").style.backgroundColor = "yellow";
  }
  if (uvi > 5 && uvi < 8) {
    document.querySelector("#currentUVI").style.backgroundColor = "orange";
  }
  if (uvi > 7 && uvi < 11) {
    document.querySelector("#currentUVI").style.backgroundColor = "red";
  }
  if (uvi > 10) {
    document.querySelector("#currentUVI").style.backgroundColor = "purple";
  }
  //   }
}

// Display 5-day forcast
function displayForcast(data) {
  //   Pull five days worth of data from API
  var multiDayForcast = document.querySelector("#multiDayForcast");
  for (let i = 0; i < 5; i++) {
    var { dt, humidity, wind_speed } = data.daily[i];
    var { icon } = data.daily[i].weather[0];
    var { max, min } = data.daily[i].temp;
    var date = new Date(dt * 1000);

    //   Format date from Unix format
    var formatDate =
      date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();

    document.querySelector("#forcastDate" + [i]).innerText = formatDate;
    document.querySelector("#forcastIcon" + [i]).src =
      "http://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector("#forcastHigh" + [i]).innerHTML =
      "High: " + max + "&#8457;";
    document.querySelector("#forcastLow" + [i]).innerHTML =
      "Low: " + min + "&#8457;";
    document.querySelector("#forcastHumid" + [i]).innerText =
      "Humidity: " + humidity + "%";
    document.querySelector("#forcastWindSpeed" + [i]).innerText =
      "Wind Speed: " + wind_speed + " MPH";
  }
}
