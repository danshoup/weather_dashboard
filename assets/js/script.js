
var searchFormEl = document.querySelector('#search-form');
var today = moment().format("MM/DD/YYYY");
var todayDate = document.querySelector("#date");
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
    console.log(weatherApi);

    fetch(weatherApi)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var curCity = data.name;
            console.log(curCity);
            var curTemp = data.main.temp;
            console.log(curTemp);
            var curWind = data.wind.speed;
            console.log(curWind);
            var curHumidity = data.main.humidity;
            console.log(curHumidity);
            currentCity.textContent = curCity + " ";
            currentTemp.textContent = curTemp;
            currentWind.textContent = curWind;
            currentHumidity.textContent = curHumidity;
            todayDate.textContent = today;
            // currentUV.textContent = curUV;
            
        })


}
    
// Listen for button click to initiate search
searchFormEl.addEventListener("submit", handleSearchFormSubmit);


