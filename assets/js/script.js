var openWeatherKey = "1b847882679576b45e695074083e332f";
// searchWeather = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=" + openWeatherKey;
// searchLocation = "http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=" + openWeatherKey ;

var searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var userInput = document.querySelector("#userInput")
    var location = userInput.value;
    // console.log(location)
    var searchLocationURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + location + "&appid=" + openWeatherKey;
    fetch(searchLocationURL)
        .then(response => response.json())
        .then(function (data) {
            console.log(data)
            var lat = data[0].lat;
            var lon = data[0].lon;
            var searchWeatherURL = "http://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=" + lat + "&lon=" + lon + "&appid=" + openWeatherKey;
            fetch(searchWeatherURL)
                .then(response => response.json())
                .then(function (weatherData) {
                    console.log(weatherData)
                    var temp = weatherData.current.temp
                    var wind = weatherData.current.wind_speed
                    var humidity = weatherData.current.humidity
                    var uvi = weatherData.current.uvi

                    document.querySelector("#cityName").textContent = location
                    document.querySelector("#temp").textContent = "temp:" + temp
                    document.querySelector("#wind").textContent = "wind:" + wind
                    document.querySelector("#humidity").textContent = "humidity:" + humidity
                    document.querySelector("#uvi").textContent = "UV index:" + uvi
                 

                    for (let i = 1; i < 6; i++) {
                        var dt = weatherData.daily[i].dt
                        var tempF = weatherData.daily[i].temp.day
                        var windF = weatherData.daily[i].wind_speed
                        var humidityF = weatherData.daily[i].humidity
                        var wf = document.createElement("div")
                        var tempP = document.createElement("p")
                        var windP = document.createElement("p")
                        var humidityP = document.createElement("p")
                        var dateH3 = document.createElement("h3")
                        var fiveDay = document.querySelector("#fiveDay")
                        var date = new Date(parseInt(dt)*1000).toLocaleDateString("en-US")
                        
                        dateH3.innerHTML = `${date}`
                        tempP.innerHTML = `Temp: ${tempF}`
                        windP.innerHTML = `Wind: ${windF}`
                        humidityP.innerHTML = `Temp: ${humidityF}`
                        wf.append(dateH3, tempP, windP, humidityP)
                        fiveDay.append(wf)
                        // document.querySelector("#tempF").textContent = "temp:" + tempF
                        // document.querySelector("#windF").textContent = "wind:" + windF
                        // document.querySelector("#humidityF").textContent = "humidity:" + humidityF
                    }})


        })

});

