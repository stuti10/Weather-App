// Tutorial by http://youtube.com/CodeExplained
// api key : 82005d27a116c2880c8f0fcb866998a0
// Tutorial by http://youtube.com/CodeExplained
// api key : 82005d27a116c2880c8f0fcb866998a0

// SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");
const sunriseElement = document.querySelector(".sunrise");
const sunsetElement = document.querySelector(".sunset");
const humidityElement = document.querySelector(".humidity");
const visibilityElement = document.querySelector(".visibility");

// App data
const weather = {};

weather.temperature = {
    unit : "celsius"
}

// APP CONSTS AND VARS
const KELVIN = 273;

// API KEY
const key = "e6549292cff804ad57f1167203581d2d";
//https://api.openweathermap.org/data/2.5/weather?id=6167865&appid=e6549292cff804ad57f1167203581d2d
//London 2648110
//Berlin 2950158
// CHECK IF BROWSER SUPPORTS GEOLOCATION
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

// SET USER'S POSITION
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// GET WEATHER FROM API PROVIDER
function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
            weather.sunrise = data.sys.sunrise;
            weather.sunset = data.sys.sunset;
            weather.humidity = data.main.humidity;
            weather.visibility = data.visibility;
        })
        .then(function(){
            displayWeather();
        });
}

// DISPLAY WEATHER TO UI
function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
    sunriseElement.innerHTML = calculateSunrise(weather.sunrise);
    sunsetElement.innerHTML = calculateSunset(weather.sunset);
    humidityElement.innerHTML = `${weather.humidity}`;
    visibilityElement.innerHTML = `${weather.visibility}`;
}

// calculate sunrise
function calculateSunrise(sunrise){
    sunriseVar = new Date(sunrise * 1000)
    var hh = ("0" + sunriseVar.getHours()).slice(-2);
    var mm = ("0" + sunriseVar.getMinutes()).slice(-2);
    var ss = ("0" + sunriseVar.getSeconds()).slice(-2);

    var date_string =  hh + ":" + mm + ":" + ss;
    return date_string;
}

// calculate sunrise
function calculateSunset(sunset){
    sunsetVar = new Date(sunset * 1000)
    var hh = ("0" + sunsetVar.getHours()).slice(-2);
    var mm = ("0" + sunsetVar.getMinutes()).slice(-2);
    var ss = ("0" + sunsetVar.getSeconds()).slice(-2);

    var date_string =  hh + ":" + mm + ":" + ss;
    return date_string;
}

// C to F conversion
function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

// WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENET
tempElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;

    if(weather.temperature.unit == "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);

        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }else{
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
});

