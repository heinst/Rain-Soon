var UI = require('ui');
var ajax = require('ajax');

// Create a Card with title and subtitle
var card = new UI.Card({
  title:'Rain Soon?',
  subtitle:'Fetching...'
});

// Display the Card
card.show();

var locationOptions = {
  enableHighAccuracy: true, 
  maximumAge: 10000, 
  timeout: 10000
};

function locationSuccess(pos) {
  console.log('lat= ' + pos.coords.latitude + ' lon= ' + pos.coords.longitude);
  var lat = pos.coords.latitude;
  var lon = pos.coords.longitude;
  
  var URL = 'https://api.forecast.io/forecast/4e658331b4ec7d9d30d2556ee01ae311/' + lat + ',' + lon;
  
  ajax(
  {
    url: URL,
    type: 'json'
  },
  function(data) {
    
    var rainProbability = data.hourly.data[0].precipProbability;
    
    if(rainProbability > 0.0)
    {
        card.subtitle("RAIN!");
        card.body((rainProbability * 100) + "% chance of rain in the next hour.");
    }
    else
    {
        card.subtitle("No rain...");
        card.body((rainProbability * 100) + "% chance of rain in the next hour.");
    }
  },
  function(error) {
    // Failure!
    console.log('Failed fetching weather data: ' + error);
  }
);
}

function locationError(err) {
  console.log('location error (' + err.code + '): ' + err.message);
}

Pebble.addEventListener('ready',
  function(e) {
    // Request current position
    navigator.geolocation.getCurrentPosition(locationSuccess, locationError, locationOptions);
  }
);

