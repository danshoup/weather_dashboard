function renderMoment() {
    // Use Moment.js to format today's date for the jumbotron
    var today = moment().format("dddd, MMMM Mo - YYYY");
    $("#currentDay").text(today);
    console.log(today);
}
renderMoment()

fetch("https://api.openweathermap.org/data/2.5/weather?q=okemos&appid=3c229c00e34da818096144820759d78c", {
    cache: "reload",
})
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    });
