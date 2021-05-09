function renderMoment() {
    // Use Moment.js to format today's date for the jumbotron
    var today = moment().format("dddd, MMMM Mo - YYYY");
    $("#currentDay").text(today);
    console.log(today);
}
renderMoment()

