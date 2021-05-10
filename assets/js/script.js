
var searchFormEl = document.querySelector('#search-form');

var today = moment().format("MM/DD/YYYY");
var dayOne = moment().add(1, 'd').format("MM/DD/YYYY");
var dayTwo = moment().add(2, 'd').format("MM/DD/YYYY");
var dayThree = moment().add(3, 'd').format("MM/DD/YYYY");
var dayFour = moment().add(4, 'd').format("MM/DD/YYYY");
var dayFive = moment().add(5, 'd').format("MM/DD/YYYY");
var todayDate = document.querySelector("#date");
var date1 = document.querySelector("#day1");
var date2 = document.querySelector("#day2");
var date3 = document.querySelector("#day3");
var date4 = document.querySelector("#day4");
var date5 = document.querySelector("#day5");
todayDate.textContent = today;
date1.textContent = dayOne;
date2.textContent = dayTwo;
date3.textContent = dayThree;
date4.textContent = dayFour;
date5.textContent = dayFive;



var currentCity = document.querySelector("#nowCity");
var currentTemp = document.querySelector("#nowTemp");
var currentWind = document.querySelector("#nowWind");
var currentHumidity = document.querySelector("#nowHumid");
var currentUV = document.querySelector("#nowUV");






// Get user input for city weathe search and add input city to API url
function handleSearchFormSubmit(event) {
    event.preventDefault();

    var searchCityVal = document.querySelector('#city-input').value;
    searchCityVal = searchCityVal.toLowerCase();
    console.log(searchCityVal);

    if (!searchCityVal) {
        console.error("You need a search input value!");
        return;
    }

   
    // API call for city weather info based in user city input
    var weatherApi = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCityVal + "&units=imperial&appid=3c229c00e34da818096144820759d78c"

    fetch(weatherApi)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var curCity = data.name;
            var curTemp = data.main.temp;
            var curWind = data.wind.speed;
            var curHumidity = data.main.humidity;
            var curLat = data.coord.lat;
            var curLon = data.coord.lon;
            currentCity.textContent = curCity + " - ";
            currentTemp.textContent = curTemp;
            currentWind.textContent = curWind;
            currentHumidity.textContent = curHumidity;
            
            var fiveDay = "https://api.openweathermap.org/data/2.5/onecall?lat=" + curLat + "&lon=" + curLon + "&exclude=minutely,hourly,alerts&units=imperial&appid=3c229c00e34da818096144820759d78c"

            fetch(fiveDay)
                .then(function (response) {
                    return response.json();
                })
                .then (function (data) {
                    console.log(data);
                    var curUV = data.current.uvi;
                    currentUV.textContent = curUV;
                    console.log(data.daily[0].temp.day);
                    console.log(data.daily[0].wind_speed);
                    console.log(data.daily[0].temp.day);
                    
                    // for (var i = 0; i < 5; i++) {
                    //     console.log(data.daily[4].temp.day);
                    // }

        })

        })

}
    
// Listen for button click to initiate search
searchFormEl.addEventListener("submit", handleSearchFormSubmit);
