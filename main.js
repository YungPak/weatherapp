const api = {
  key: "881af1bf318b5f62ecaeaa20e527b3b5",
  base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

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

  const weatherFormation = ["sunny", "clouds", "clear", "rain", "thunderstorm", "snow" ];
  const weatherIcon = ["Assets/Sun.png", "Assets/Sun.png", "Assets/Sun.png", "Assets/Sun.png", "Assets/Sun.png", "Assets/Sun.png" ];

  for (i = 0; i <= weatherFormation.length; i++){
    if (weather.weather[0].main = weatherFormation[i]){
      console.log(weather_el.innerText);
      document.getElementById("weatherImage").src = weatherIcon[i];
    }
  }



  
  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function imgChange(){
  document.getElementById("weatherImage").src = "Assets/Sun.png";
}

//imgChange();





function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}


function bgSwitch(){
  var today = new Date();
  var time = today.getHours()

  if (time >= 18){
    $("body").css("background-color" , "#7658D9");
  }else{
    $("body").css("background-color" , "#00B8FF"); 
  }
}

bgSwitch();

