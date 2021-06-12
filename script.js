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
  console.log("hello");
  var city = document.querySelector("#citySearch").value;
  fetch(
    "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + apiKey
  )
    .then((response) => response.json())
    .then((data) => fetchWeather(data));
}

// Capture current and forcast weather
function fetchWeather(data) {
  
    fetch(
    "https://api.openweathermap.org/data/2.5/onecall?lat=33.4484&lon=-112.074&exclude=minutely,hourly,alerts&units=imperial&appid=" +
      apiKey
  )
    .then((response) => {
      console.log(response);
      return response.json();
    })
    // .then((data) => console.log(data))
    // Send to current weather function
    .then((data) => displayCurrent(data));

  // Send to forcast function
  // .then((data) => this.displayForcast(data));
}

// fetchWeather()

function displayCurrent(data) {
  var { dt, temp, humidity, wind_speed, uvi } = data.current;
  var { icon } = data.current.weather[0];
  var city = document.querySelector("#citySearch").value;

  console.log(dt, temp, humidity, wind_speed, uvi, icon);

  // May need to rename city variable
  document.querySelector("#currentCity").innerText = city;

  document.querySelector("#currentDate").innerText = dt;
  document.querySelector("#currentIcon").src =
    "http://openweathermap.org/img/wn/" + icon + ".png";
  document.querySelector("#currentTemp").innerText = temp + "°F";
  document.querySelector("#currentHumid").innerText = humidity + "%";
  document.querySelector("#currentWindSpeed").innerText = wind_speed + " MPH";
  document.querySelector("#currentUVI").innerText = uvi;

  displayForcast(data)
}

function displayForcast(data) {
    var container = document.querySelector("#multiDayForcast")
    var example = ["a", "b", "c", "d", "e"]
    
    for (var i=0; i<5;  i++){
        var nameEl = document.createElement("p")
        nameEl.innerText = example[i]
        container.appendChild(nameEl)
        // Forcast data will be looped through here, use similar coding as display current
        // 

    }
}
// const obj = {
//     a:function(){},
//     b:function(){
//         this.a()
//     }
// }

document.querySelector("#searchBtn").addEventListener("click", fetchLatLong);
