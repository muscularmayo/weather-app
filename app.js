import {weatherAPIKey, giphyAPIKey }from './api_keys.js'


//console.log(weatherAPIKey, giphyAPIKey)
const btn = document.querySelector('button')
btn.addEventListener('click', handleWeatherSearch)
 //selecting the image so we can transform it shortly
//final URL = `api.openweathermap.org/data/2.5/weather?q=${}&appid=${}``
const noKeyNoLocationWeatherURL = 'https://api.openweathermap.org/data/2.5/weather?q='
const noSearchGiphyURL = `https://api.giphy.com/v1/gifs/translate?api_key=${giphyAPIKey}&s=`

appropriateGIF('searching for weather gif')



function searchCurrentWeather (location) {
  const fetchURL = noKeyNoLocationWeatherURL + location + `&units=imperial&appid=${weatherAPIKey}`
  fetch (fetchURL)
    .then(function(response) {
      return response.json()
    })
    .then((data) => {
      console.log(data, 'original')
      if (data.cod === '404') {
        appropriateGIF('404 error')
        console.log('location not found')
        clearDiv('#current')
        clearDiv('#weekly')


      }
      const h1 = document.querySelector('#locationTitle');

      h1.innerText = data.name
      appropriateGIF(data.weather[0].description) //description of the weather
      console.log(data.weather[0])
      searchWeeklyWeather(data)
      return data;

    }).then((data) => {
      createCurrentWeatherDiv(data)
    })
    .catch((err) => {
      console.error(err)

    })
}

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year;
  return time;
}

function searchWeeklyWeather (data) {
  clearDiv('#weekly')
  const weeklyDiv = document.querySelector('#weekly')
  const WeeklyWeatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&units=imperial&exclude=minutely,current,hourly&appid=${weatherAPIKey}`
  fetch (WeeklyWeatherURL)
    .then(function (response) {
      return response.json()
    })
    .then((data) => {
      console.log(data)
      data.daily.forEach((day) => {
        console.log(day)
        console.log(day.temp.max, day.temp.min, 'high and low')
        const div = document.createElement('div')
        const icon = day.weather[0].icon;
        const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`
        const img = document.createElement('img')
        const high = document.createElement('div')
        high.innerText = `High: ${day.temp.max}`
        const low = document.createElement('div')
        const date = document.createElement('div')
        low.innerText = `Low: ${day.temp.min}`
        img.src = iconURL;
        div.appendChild(date)
        div.appendChild(img)
        div.appendChild(high)
        div.appendChild(low)

        date.innerText = timeConverter(day.dt);

        weeklyDiv.appendChild(div)

        /*
        fetch(iconURL)
          .then((response) => {
            return response.json()
          })
          .then((data) => {
            img.src =
          })

      })*/
    })
  })
}


function createAndAppendWeeklyDivs(day) {
  const weekly = document.querySelector('#weekly')

}

function appropriateGIF (keyword) {
  const img = document.querySelector('#gif');
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
  const container = document.querySelector('#weather')
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
    p.innerText = `It is currently ${currentWeatherData.main.temp} degrees Farenheit in ${currentWeatherData.name}, and it feels like ${currentWeatherData.main.feels_like} F. The 24-hour high is ${currentWeatherData.main.temp_max} F and the low is ${currentWeatherData.main.temp_min} F.`
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