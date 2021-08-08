const api = {
  key: "881af1bf318b5f62ecaeaa20e527b3b5",
  base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

var today = new Date();
var time = today.getHours()

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults (query) {
  fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}

function displayResults (weather) {
  
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°F</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;


  const weatherFormation = ["Sunny", "Clouds", "Clear", "Rain", "Thunderstorm", "Snow", "Haze"];
  const weatherIcon = ["Assets/Sun.png", "Assets/Cloud.png", "Assets/SunCloud.png", "Assets/Rain.png", "Assets/Thunderstorm.png", "Assets/Snow.png", "Assets/Cloud.png" ];
  const weatherIconNight = ["Assets/Sun.png" , "Assets/Night/Clouds.png", "Assets/Night/Clear.png", "Assets/Night/Rain.png" , "Assets/Night/Thunderstorm.png", "Assets/Night/Snow.png", "Assets/Night/Clouds.png"]; 
  
  for (i = 0; i < weatherFormation.length; i++){

    if (time >= 18){

      if (weather.weather[0].main == weatherFormation[i]){
        document.getElementById("weatherImage").src = weatherIconNight[i];
      }

    } else if (weather.weather[0].main == weatherFormation[i]){
      document.getElementById("weatherImage").src = weatherIcon[i];
    }
  
  }

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month}, ${year} `;
}




function bgSwitch(){

  if (time >= 18){
    $("body").css("background-color" , "#36454F");

  }else{
    $("body").css("background-color" , "#00B8FF"); 
  }
}

bgSwitch();

