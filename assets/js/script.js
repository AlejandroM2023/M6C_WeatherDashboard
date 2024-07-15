
//bring in search history
let searchHistory = JSON.parse(localStorage.getItem('cityHistory'));



function search(){

    //bring in value from search field
    const city = $('input').val();
    console.log(city);
}







$(document).ready(function(){

    //if no local storage search history-make empty array
    if(searchHistory === null){
        searchHistory = [];
    }


    //set up button
    $('button').on('click',search);








});







/*$(document).ready(function () {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?cnt=6&lat=44.34&lon=10.99&appid=ea02e1f93a0a208ae95fc700a4520980`)
        .then(function(response){
            return response.json();
        }).then(function(data){
            console.log(data);

        });
});*/