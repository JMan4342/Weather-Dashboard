var APIKey = "f57bb5add0d36df3df9a18537e407ac9";
var city = document.querySelector("#citySearch");
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=f57bb5add0d36df3df9a18537e407ac9";
var searchBtn = document.querySelector("#searchBtn");
// var citySearch = document.querySelector("#citySearch");

searchBtn.addEventListener("click", function(){
    fetch(queryURL)
    .then(response => response.json())
    .then(data => console.log(data))

    .catch(err => alert("Wrong city name!"))

})