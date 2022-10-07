let now = new Date();
let currentDate = document.querySelector("#todayDate");
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];
let hour = now.getHours();
let minute = now.getMinutes();
if (minute < 10) {
    minute = `0${minute}`;
}
currentDate.innerHTML = `${day}, ${hour}:${minute}`;

//

function changeTemperature(response) {
    let temperature = Math.round(response.data.main.temp);
    let newTemp = document.querySelector("#todayTemp");
    newTemp.innerHTML = `${temperature}`;
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("#description").innerHTML = response.data.weather[0].description;
    document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

    celsiusTemperature = response.data.main.temp;
}
////////////////////////
function changeCity(city) {
    let h1 = document.querySelector("h1");
    h1.innerHTML = `${city}`;
    let apiKey = "96771e971243152d6b8948878c26adde";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(`${apiUrl}`).then(changeTemperature);
}

function handleCity(e){
    e.preventDefault()
    let searchInput = document.querySelector("#cityName");
    changeCity(searchInput.value)
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleCity);

changeCity("paris")
//

function seeMyPosition(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;

    let weatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=96771e971243152d6b8948878c26adde&units=metric`;


    function seeTemp(response) {
        let temperature = Math.round(response.data.main.temp);


        function getMyPositionWeather(event) {
            event.preventDefault();
            let writeTemperature = document.querySelector("#todayTemp");
            writeTemperature.innerHTML = `${temperature}`;
            let myCity = document.querySelector("h1");
            myCity.innerHTML = response.data.name;
            document.querySelector("#humidity").innerHTML = response.data.main.humidity;
            document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
            document.querySelector("#description").innerHTML = response.data.weather[0].description;
            document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

            celsiusTemperature = response.data.main.temp;
        }
        let buttonCurrent = document.querySelector("#currentLocation");
        buttonCurrent.addEventListener("click", getMyPositionWeather);

    }
    axios.get(`${weatherApi}`).then(seeTemp);

}
navigator.geolocation.getCurrentPosition(seeMyPosition);

//

function changeToFahrenheit(event) {
    event.preventDefault();
    let temperature = document.querySelector("#todayTemp");
    let fahrenheitTemperature = (celsiusTemperature * 9 / 5) + 32;
    temperature.innerHTML = Math.round(fahrenheitTemperature);
}


function changeToCelsius(event) {
    event.preventDefault();
    let temperature = document.querySelector("#todayTemp");
    temperature.innerHTML = Math.round(celsiusTemperature);

}


let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", changeToFahrenheit)

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", changeToCelsius)

let celsiusTemperature = null;
