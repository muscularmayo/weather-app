//import weatherAPIKey, giphyAPIKey from './api_keys.js'

/*

console.log(weatherAPIKey, giphyAPIKey)
const btn = document.querySelector('button')
btn.addEventListener('click', searchWeather)
const img = document.querySelector('img'); //selecting the image so we can transform it shortly
const fetchURL = 'api.openweathermap.org/data/2.5/weather?q=${}&appid=${}'






const searchWeather = function() {


}

*/

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