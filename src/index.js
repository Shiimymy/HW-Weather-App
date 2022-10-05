// Curent date 

let now = new Date();
let  currentDate = document.querySelector("#todayDate");
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay ()];
let hour = now.getHours();
let minute = now.getMinutes();
if (minute < 10) {
minute = `0${minute}`;
   }
currentDate.innerHTML = `${day}, ${hour}:${minute}`;

// Fetch Searched city with datas

function changeCity(event) {
    event.preventDefault();
    let searchInput = document.querySelector ("#cityName");

let h1 = document.querySelector("h1");
if (searchInput.value) {
    h1.innerHTML = `${searchInput.value}`;
    let apiKey = "96771e971243152d6b8948878c26adde";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${units}`;

axios.get(`${apiUrl}`).then(changeTemperature);
    } 
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", changeCity);


function changeTemperature(response) {
        let temperature = Math.round(response.data.main.temp);
        let newTemp = document.querySelector("#todayTemp");
        newTemp.innerHTML = `${temperature}`;
        document.querySelector("#humidity").innerHTML= response.data.main.humidity; 
        document.querySelector("#wind").innerHTML= Math.round(response.data.wind.speed);
        document.querySelector("#description").innerHTML= response.data.weather[0].description;
}


// Fetch Current location city and datas

function seePosition (position){
    let lat = position.coords.latitude; 
    let long = position.coords.longitude;

let weatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=96771e971243152d6b8948878c26adde&units=metric`;

function seeTemp (response){
    let temperature = Math.round(response.data.main.temp);
    

        function getMyPosition (event) {
            event.preventDefault();
        let writeTemperature = document.querySelector("#todayTemp");
        writeTemperature.innerHTML = `${temperature}`;
        let myCity = document.querySelector("h1");
        myCity.innerHTML = response.data.name;
        document.querySelector("#humidity").innerHTML= response.data.main.humidity; 
        document.querySelector("#wind").innerHTML= Math.round(response.data.wind.speed);
        document.querySelector("#description").innerHTML= response.data.weather[0].description;

         }
        let buttonCurrent = document.querySelector("#currentLocation");
        buttonCurrent.addEventListener("click", getMyPosition);

}
axios.get(`${weatherApi}`).then(seeTemp);

}
navigator.geolocation.getCurrentPosition(seePosition);
