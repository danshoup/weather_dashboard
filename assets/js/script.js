
var searchFormEl = document.querySelector('#search-form');
var recentSearches = document.querySelector("#recent");
// Use moment to add dates to forecast
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

// Variables to get current weather info for city
var currentCity = document.querySelector("#nowCity");
var currentTemp = document.querySelector("#nowTemp");
var currentWind = document.querySelector("#nowWind");
var currentHumidity = document.querySelector("#nowHumid");
var currentUV = document.querySelector("#nowUV");
var currentIcon = document.querySelector("#nowIcon");

// Variables for 5-day forecast
var tempOne = document.querySelector("#temp1");
var tempTwo = document.querySelector("#temp2");
var tempThree = document.querySelector("#temp3");
var tempFour = document.querySelector("#temp4");
var tempFive = document.querySelector("#temp5");
var windOne = document.querySelector("#wind1");
var windTwo = document.querySelector("#wind2");
var windThree = document.querySelector("#wind3");
var windFour = document.querySelector("#wind4");
var windFive = document.querySelector("#wind5");
var humidOne = document.querySelector("#humid1");
var humidTwo = document.querySelector("#humid2");
var humidThree = document.querySelector("#humid3");
var humidFour = document.querySelector("#humid4");
var humidFive = document.querySelector("#humid5");
var iconOne = document.querySelector("#icon1");
var iconTwo = document.querySelector("#icon2");
var iconThree = document.querySelector("#icon3");
var iconFour = document.querySelector("#icon4");
var iconFive = document.querySelector("#icon5");






// Get user input for city weathe search and add input city to API url
function handleSearchFormSubmit(event) {
    event.preventDefault();

    var searchCityVal = document.querySelector('#city-input').value;
    localStorage.setItem("city", searchCityVal);
    var recentCity = document.createElement("button");
    recentCity.classList.add("btn", "btn-secondary", "btn-block");
    recentCity.textContent = localStorage.getItem("city");
    recentSearches.append(recentCity);
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
            var curLat = data.coord.lat;
            var curLon = data.coord.lon;
            currentCity.textContent = data.name + " - ";
            currentTemp.textContent = data.main.temp;
            currentWind.textContent = data.wind.speed;
            currentHumidity.textContent = data.main.humidity;
            currentIcon.src = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
            
            // API call to get the five-day forecast (could have gotten current here also, but needed other API to get lat/long?)
            var fiveDay = "https://api.openweathermap.org/data/2.5/onecall?lat=" + curLat + "&lon=" + curLon + "&exclude=minutely,hourly,alerts&units=imperial&appid=3c229c00e34da818096144820759d78c"

            fetch(fiveDay)
                .then(function (response) {
                    return response.json();
                })
                .then (function (data) {
                    console.log(data);
                    currentUV.textContent = data.current.uvi;
                    tempOne.textContent = data.daily[0].temp.day;
                    tempTwo.textContent = data.daily[1].temp.day;
                    tempThree.textContent = data.daily[2].temp.day;
                    tempFour.textContent = data.daily[3].temp.day;
                    tempFive.textContent = data.daily[4].temp.day;
                    windOne.textContent = data.daily[0].wind_speed;
                    windTwo.textContent = data.daily[1].wind_speed;
                    windThree.textContent = data.daily[2].wind_speed;
                    windFour.textContent = data.daily[3].wind_speed;
                    windFive.textContent = data.daily[4].wind_speed;
                    humidOne.textContent = data.daily[0].humidity;
                    humidTwo.textContent = data.daily[1].humidity;
                    humidThree.textContent = data.daily[2].humidity;
                    humidFour.textContent = data.daily[3].humidity;
                    humidFive.textContent = data.daily[4].humidity;
                    iconOne.src = "http://openweathermap.org/img/wn/" + data.daily[0].weather[0].icon + ".png";
                    iconTwo.src = "http://openweathermap.org/img/wn/" + data.daily[1].weather[0].icon + ".png";
                    iconThree.src = "http://openweathermap.org/img/wn/" + data.daily[2].weather[0].icon + ".png";
                    iconFour.src = "http://openweathermap.org/img/wn/" + data.daily[3].weather[0].icon + ".png";
                    iconFive.src = "http://openweathermap.org/img/wn/" + data.daily[4].weather[0].icon + ".png";

        })

        })

}
 
//  Function to replace the input value with button text on click; struggling to get this to work (find different solution...)
function handleRecentSearches(event) {
    event.preventDefault();
    var target = event.target;
    var reSubmit = document.querySelector("#submitBtn");
    document.querySelector('#city-input').value = target.textContent;
    console.log(target.textContent);
    reSubmit.click();
    return;

}

// Listen for button click to initiate search
searchFormEl.addEventListener("submit", handleSearchFormSubmit);
// Listen for click on recent searches buttons
recentSearches.addEventListener("click", handleRecentSearches);

