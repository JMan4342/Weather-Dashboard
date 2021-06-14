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
  var date = new Date(1623686400 * 1000);
  console.log(date);
  var formatDate =
    date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
  console.log(formatDate);

  console.log(temp, humidity, wind_speed, uvi, icon, city);

  // May need to rename city variable
  document.querySelector("#currentCity").innerText = city;

  document.querySelector("#currentDate").innerText = formatDate;
  document.querySelector("#currentIcon").src =
    "http://openweathermap.org/img/wn/" + icon + ".png";
  document.querySelector("#currentTemp").innerHTML = temp + "&#8457;";
  document.querySelector("#currentHumid").innerText = humidity + "%";
  document.querySelector("#currentWindSpeed").innerText = wind_speed + " MPH";
  document.querySelector("#currentUVI").innerText = uvi;
}

function displayForcast(data) {
  var container = document.querySelector("#multiDayForcast");
  var example = [
    "#forcastDate0",
    "#forcastTempHigh0",
    "#forcastTempLow0",
    "#forcastIcon0",
    "#forcastHumid0",
    "#forcastWindSpeed0",
  ];

  // Forcast data will be looped through here, use similar coding as display current
  for (var i = 0; i < 5; i++) {
    var nameEl = document.createElement("p");
    nameEl.innerText = example[i];
    container.appendChild(nameEl);
    var { dt, humidity, wind_speed } = data.daily[0];
    var { icon } = data.daily[0].weather[0];
    var { max, min } = data.daily[0].temp;
    var city = document.querySelector("#citySearch").value;
    var date = new Date(dt * 1000);
    console.log(date);
    var formatDate =
      date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
    console.log(formatDate);

    console.log(max, min, humidity, wind_speed, icon, city);

    document.querySelector("#forcastDate0").innerText = formatDate;
    document.querySelector("#forcastIcon0").src =
      "http://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector("#forcastTempHigh0").innerHTML = max + "&#8457;";
    document.querySelector("#forcastTempLow0").innerHTML = min + "&#8457;";
    document.querySelector("#forcastHumid0").innerText = humidity + "%";
    document.querySelector("#forcastWindSpeed0").innerText =
      wind_speed + " MPH";
  }
}

// const obj = {
//     a:function(){},
//     b:function(){
//         this.a()
//     }
// }

document.querySelector("#searchBtn").addEventListener("click", fetchLatLong);
