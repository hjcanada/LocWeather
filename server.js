var express = require("express");
var request = require("request");

var port = 3000;
var app = express();

app.get("/weather", function(req, res) {
	var lat = req.query.lat;
	var lon = req.query.lon;
	var appid = req.query.appid;
	var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + appid;
	
	// debug
	// console.log("Server URL: " + url);

	request.get(url, function(err, response, body) {

		body = JSON.parse(body);

		if (err) {
			res.send("Connection to OpenWeatherMap Failed");
		} else if (body.cod == 401) {
			res.send(body);
			console.log(body);
		} else {
			var weather = {};
			weather.cod = body.cod;
			weather.city = body.name;
			weather.description = body.weather[0].main;
			weather.cTemp = Math.floor(body.main.temp - 273.15) + " °C";
			weather.fTemp = Math.floor((body.main.temp - 273.15) * 9 / 5 + 32) + " °F";
			weather.windspeed = body.wind.speed.toFixed(1) + " m/s";
			weather.humidity = body.main.humidity + "%";
			weather.icon = "http://openweathermap.org/img/w/" + body.weather[0].icon + ".png";
			
			res.send(weather);
		}
	});
});
		

app.use(express.static(__dirname + "/public"));

app.listen(port, function() {
	console.log("Server is listening on PORT " + port);
});
