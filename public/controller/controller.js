var app = angular.module("myApp", []);

app.controller("myCtrl", function($scope, $http) {
	
	$scope.wthAquire = function() {

		navigator.geolocation.getCurrentPosition(function (position) {

		var appid = $scope.appid;
		var lat = position.coords.latitude;
		var lon = position.coords.longitude;
		var url = "/weather?lat=" + lat + "&lon=" + lon + "&appid=" + appid;
		// debug
		// console.log("Ctrl URL: " + url);

		$http.get(url).then(function(res) {
			if (res.data.cod == 401) {
				$scope.value2 = "true";
				$scope.value1 = !$scope.value2;
				$scope.invalid = res.data.message;
			} else {
				$scope.description = res.data.description;
				$scope.windspeed = res.data.windspeed;
				$scope.city = res.data.city;
				$scope.cTemp = res.data.cTemp;
				$scope.fTemp = res.data.fTemp;
				$scope.icon = res.data.icon;
				$scope.humidity = res.data.humidity;
				$scope.value1 = "true";
				$scope.value2 = !$scope.value1;

				switch($scope.description) {
				case "Clear": 
					$scope.myObj = {
						"background":"url('../img/clear.jpg')",
						"background-size":"cover"
					};
					break;
				case "Clouds": 
					$scope.myObj = {
						"background":"url('../img/clouds.jpg')",
						"background-size":"cover"
					};
					break;
				case "Haze":
				case "Mist":
					$scope.myObj = {
						"background":"url('../img/haze.jpg')",
						"background-size":"cover"
					};
					break;
				case "Rain":
				case "Drizzle": 
					$scope.myObj = {
						"background":"url('../img/rain.jpg')",
						"background-size":"cover"
					};
					break;
				case "Snow": 
					$scope.myObj = {
						"background":"url('../img/snow.jpg')",
						"background-size":"cover"
					};
					break;
				case "Extreme": 
					$scope.myObj = {
						"background":"url('../img/extreme.jpg')",
						"background-size":"cover"
					};
					break;
				default: 
					$scope.myObj = {
						"background":"url('../img/background.jpg')",
						"background-size":"cover"
					};
					break;
				};
				

			};
	
		});
		});
	};
});
