var humidity, pressure, temperature, windSpeed, object, weatherSummary;

var element = function (id) {
	return document.getElementById(id);
};

window.onload = function () {
	humidity = element('current-humidity');
	pressure = element('current-pressure');
	temperature = element('current-temperature');
	windSpeed = element('current-wind-speed');
	weatherSummary = element('weather-summary');
};

function getWeather () {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function (position) {
			var lat = position.coords.latitude;
			var long = position.coords.longitude;
			showWeather(lat, long);
		})
	} else {
		alert ("could not get Weater");
	}
};
function showWeather(lat, long) {
	var url = `https://api.darksky.net/forecast/0e21163b073e9068473d15a59108f70d/${lat},${long}` + `?format=jsonp&callback=displayWeather`;
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = url;
	document.getElementsByTagName('head')[0].appendChild(script);
	displayWeather(object);
};
function displayWeather (object) {
	humidity.innerHTML = 'Humidity: ' + humidityPercentage(object.currently.humidity) + '%';
	pressure.innerHTML = 'Pressure: ' + object.currently.pressure + ' mb';
	temperature.innerHTML = 'Temperature: ' + farenheitToCelsium(object.currently.temperature) + ' C/' + object.currently.temperature + 'F';
	windSpeed.innerHTML = 'Wind Speed: ' + knotsToKilometers(object.currently.windSpeed) + ' km/h';
	weatherSummary.innerHTML = 'Current Location: ' + object.timezone +" Weather Summary: " + object.currently.summary;
	document.getElementById('weather-summary').style.backgroundColor = "darkblue";
	console.log(object.daily)
};

function humidityPercentage (l) {
	return Math.round(l * 100);
};

function farenheitToCelsium (l) {
	return Math.round((l - 32) * 0.556);
};

function knotsToKilometers (l) {
	return Math.round(l * 1.852);
};
