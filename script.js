var APIKey = "f57bb5add0d36df3df9a18537e407ac9";
debugger
var city = "";
function writeCity() {
    city = document.querySelector("#citySearch");
    console.log(city.value);
    alert(city.value);
};
// var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=f57bb5add0d36df3df9a18537e407ac9";
// var searchBtn = document.querySelector("#searchBtn");

// var queryLatLong = "http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=f57bb5add0d36df3df9a18537e407ac9";
// console.log(queryLatLong)
// var citySearch = document.querySelector("#citySearch");

// function getWeatherData(){
//     fetch(queryLatLong)
//     .then(response => response.json())
//     .then(data => console.log(data))
// }

// buttonContainer.addEventListener("click", function(e){
//     getWeatherData(cityName)
// })

// FormData.addEventListener("submit", function(e){
//     e.preventDefault();
//     getWeatherData(cityName);
// })