var apiKey = "f57bb5add0d36df3df9a18537e407ac9";
var city = document.querySelector("#citySearch");

// buttonContainer.addEventListener("click", function(e){
//     getWeatherData(cityName)
// })

// FormData.addEventListener("submit", function(e){
//     e.preventDefault();
//     getWeatherData(cityName);
// })

// Capture latitude and longitude of city
function fetchLatLong(city) {
    fetch(
        "http://api.openweathermap.org/geo/1.0/direct?q=phoenix&appid=" +
        this.apiKey
    )
        .then((response) => response.json())
        .then((data) => console.log(data));
    }

  // Capture current and forcast weather
  function fetchWeather(latLong) {
    fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=33.4484&lon=-112.074&exclude=minutely,hourly,alerts&units=imperial&appid=" + 
        this.apiKey
    )
        .then((response) => response.json())
        // .then((data) => console.log(data))
        // Send to current weather function
        .then((data) => this.displayCurrent(data))
        
        // Send to forcast function
        // .then((data) => this.displayForcast(data));
    }

function displayCurrent(data) {
    var { dt, temp, humidity, wind_speed, uvi } = data.current;
    var { icon } = data.current.weather[0];

    console.log(dt, temp, humidity, wind_speed, uvi, icon)

    // May need to rename city variable
    document.querySelector("#currentCity").innerText = city;
    
    document.querySelector("#currentDate").innerText = dt;
    document.querySelector("#currentIcon").src = "http://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector("#currentTemp").innerText = temp + "°F";
    document.querySelector("#currentHumid").innerText = humidity + "%";
    document.querySelector("#currentWindSpeed").innerText = wind_speed + " MPH";
    document.querySelector("#currentUVI").innerText = uvi;

}