import {weatherAPIKey, giphyAPIKey }from './api_keys.js'


//console.log(weatherAPIKey, giphyAPIKey)
const btn = document.querySelector('button')
btn.addEventListener('click', handleWeatherSearch)
const img = document.querySelector('img'); //selecting the image so we can transform it shortly
//final URL = `api.openweathermap.org/data/2.5/weather?q=${}&appid=${}``
const noKeyNoLocationWeatherURL = 'https://api.openweathermap.org/data/2.5/weather?q='
const noSearchGiphyURL = `https://api.giphy.com/v1/gifs/translate?api_key=${giphyAPIKey}&s=`

appropriateGIF('search weather here')



function searchCurrentWeather (location) {
  const fetchURL = noKeyNoLocationWeatherURL + location + `&units=imperial&appid=${weatherAPIKey}`
  console.log(fetchURL)
  fetch (fetchURL)
    .then(function(response) {
      return response.json()
    })
    .then((data) => {
      console.log(data)
      if (data.cod === '404') {
        appropriateGIF('404 error')
        console.log('location not found')
      }
      appropriateGIF(data.weather[0].description) //description of the weather
      console.log(data.weather[0])
      createCurrentWeatherDiv(data)
      return data;

    })
    .catch((err) => {
      console.error(err)

    })
}

function appropriateGIF (keyword) {
  const giphySearch = noSearchGiphyURL + keyword
  fetch(giphySearch)
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      img.src = response.data.images.original.url
      img.title = keyword;
    })
}

function handleWeatherSearch () {
  const locationQuery = document.querySelector('#search').value;
  searchCurrentWeather(locationQuery);




}

function createCurrentWeatherDiv (currentWeatherData) {
  clearDiv('#current')
  const img = document.createElement('img')
  const currentDiv = document.querySelector('#current')

  const icon = currentWeatherData.weather[0].icon;
  const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`
  fetch (iconURL)
    .then((response) => {
      return response
    })
    .then((data) => {
      img.src = data.url
      currentDiv.appendChild(img)
    })
    .catch((err) => {
      console.error(err)

    })
    const p = document.createElement('p')
    p.innerText = `it is currently ${currentWeatherData.main.temp} degrees Farenheit in ${currentWeatherData.name}, and it feels like ${currentWeatherData.main.feels_like}. The 24-hour high is ${currentWeatherData.main.temp_max} Farenheit and the low is ${currentWeatherData.main.temp_min} Farenheit.`
    currentDiv.appendChild(p);
}

function clearDiv (id) {
  var e = document.querySelector(id);

  //e.firstElementChild can be used.
  var child = e.lastElementChild;
  while (child) {
      e.removeChild(child);
      child = e.lastElementChild;
  }
}






/*
function spawnCatGif() {
  fetch('https://api.giphy.com/v1/gifs/translate?api_key=jpg0bN4d11zxLuU5P37dXPbaXH2t10BT&s=cats', {mode: 'cors'} )
    .then(function(response) {
      return response.json()
    })
    .then(function(response) {
      img.src = response.data.images.original.url
    });
};
spawnCatGif();

async function searchGif() {
  const userInput = document.querySelector('#search').value;
  const searchURL = fetchURL + userInput;
  const response = await fetch(searchURL, {mode: 'cors'})
  const searchData = await response.json();

  img.src = searchData.data.images.original.url;

  //refactored

  /*
  fetch(searchURL, {mode: 'cors'})
    .then(function(response) {
      return response.json()
    })
    .then((response) => {
      img.src = response.data.images.original.url;
    })
    .catch( (err) => {
      console.log('big time error bucko')
    })

}*/