// ** Html DOM Variable
const mainContainer = document.querySelector(".main-container");
let tempEl = document.querySelector(".current-temp")
let weatherEl = document.querySelector(".current-weather")
let locationEl = document.querySelector(".location")
let weatherIcon = document.querySelector("#weather-image");
const searchBar = document.querySelector(".search-input");
const searchBtn = document.getElementById("search-button");


// ** Data fetching
async function getWeatherData(location) {
  const apiKey = "fd95f21ff10ecd0d6b076cee93874cad";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

  return await fetch(url)
    .then(res => res.json())
    .then(data => {
      const weatherData = {
        currentWeather :  data.weather[0].main,
        currentTemp : data.main.temp,
        location : data.name,
        locationCoutry : data.sys.country,
      };
      return weatherData
    })
  }
  
  //** Updating the UI (HTML Elements)
  function updateHTML(weatherData
    ) {
    mainContainer.style.display = "flex";
    tempEl.textContent = `${weatherData.currentTemp}°C`;
    weatherEl.textContent = weatherData.currentWeather;
    locationEl.textContent = weatherData.location + ", " + weatherData.locationCoutry
    
    if (weatherData.currentWeather === "Haze") {
      weatherIcon.src = "images/haze.png"
    } else if (weatherData.currentWeather === "Drizzle") {
      weatherIcon.src = "images/drizzle.png"
    }else if (weatherData.currentWeather === "Thunderstorm") {
      weatherIcon.src = "images/thunder.png"
    }else if (weatherData.currentWeather === "Rain") {
      weatherIcon.src = "images/rain.png"
    }else if (weatherData.currentWeather === "Clear") {
      weatherIcon.src = "images/sunny.png"
    }else if (weatherData.currentWeather === "Clouds") {
      weatherIcon.src = "images/haze.png"
    }
}

//** Event listeners
searchBtn.addEventListener("click" ,() => {
  const errorMessage = document.querySelector(".error-message");
  const location = searchBar.value;

  getWeatherData(location)
    .then (weatherData => {
      updateHTML(weatherData);
    }) 
    .catch(error => {
      console.log(error)
      errorMessage.style.display = "flex"
    })
  })

searchBar.addEventListener("keypress", (e) => {
  if ( e.key  === "Enter") {
    
    const errorMessage = document.querySelector(".error-message");
    const location = searchBar.value;

    getWeatherData(location)
      .then (weatherData => {
        updateHTML(weatherData);
      }) 
      .catch(error => {
        console.log(error)
        errorMessage.style.display = "flex"
      })
  }

})