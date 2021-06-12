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
fetch(
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
      city +
      "&appid=" +
      this.apiKey
  )
      .then((response) => response.json())
      .then((data) => console.log(data));
  
  // Capture current and forcast weather
  fetch(
      "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + 
      "&lon=" + lon + 
      "&exclude=minutely,hourly,alerts&appid=" + 
      this.apiKey
  )
      .then((response) => response.json())
      .then((data) => console.log(data));
  