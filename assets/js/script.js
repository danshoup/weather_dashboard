
var searchFormEl = document.querySelector('#search-form');

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
        })


}
    
// Listen for button click to initiate search
searchFormEl.addEventListener("submit", handleSearchFormSubmit);


