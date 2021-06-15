var apiKey = "f57bb5add0d36df3df9a18537e407ac9";

// buttonContainer.addEventListener("click", function(e){
//     getWeatherData(cityName)
// })

// FormData.addEventListener("submit", function(e){
//     e.preventDefault();
//     getWeatherData(cityName);
// })

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
    .then((data) => fetchWeather(data));
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
        // .then((data) => console.log(data))
        // Send to current weather function
        .then((data) => {
            displayForcast(data);
            displayCurrent(data);
        });
        
        // Send to forcast function
    }
    
    // fetchWeather()
    
    function displayCurrent(data) {
        var { dt, temp, humidity, wind_speed, uvi } = data.current;
        var { icon } = data.current.weather[0];
        var city = document.querySelector("#citySearch").value;
        var date = new Date(dt * 1000);
        console.log(date);
        var formatDate =
        date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
        console.log(formatDate);
        
        console.log(temp, humidity, wind_speed, uvi, icon, city);
        
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
  // Forcast data will be looped through here, use similar coding as display current
  var multiDayForcast = document.querySelector("#multiDayForcast");

//   Pull five days worth of data from API
  for (var i = 0; i < 5; i++) {
  var { dt, humidity, wind_speed } = data.daily[i];
  var { icon } = data.daily[i].weather[0];
  var { max, min } = data.daily[i].temp;
  var date = new Date(dt * 1000);
  console.log(date);
  var formatDate =
    date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
  console.log(formatDate);
  var city = document.querySelector("#citySearch").value;
  
// Display data on page

//   var multiEl = document.createElement("p");
//     multiEl.innerText = multiDayForcast[i];
//     multiDayForcast.appendChild(multiEl);
  
  console.log(max, min, humidity, wind_speed, icon, city);
  }

//   Gets City name from search

//   Converts unix date to readable date

//   Display data on page on multiDayForcast id
}

// document.querySelector("#forcastDate0").innerText = formatDate;
// document.querySelector("#forcastIcon0").src =
// "http://openweathermap.org/img/wn/" + icon + ".png";
// document.querySelector("#forcastTempHigh0").innerHTML = max + "&#8457;";
// document.querySelector("#forcastTempLow0").innerHTML = min + "&#8457;";
// document.querySelector("#forcastHumid0").innerText =
// "Humidity: " + humidity + "%";
// document.querySelector("#forcastWindSpeed0").innerText =
// "Wind Speed: " + wind_speed + " MPH";
// }

document.querySelector("#searchBtn").addEventListener("click", fetchLatLong);
