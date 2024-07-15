
//bring in search history and last viewed city
let searchHistory = JSON.parse(localStorage.getItem('cityHistory'));
let lastCity = JSON.parse(localStorage.getItem('lastCity'));



function displayWeatherInfo(){

}


function search(){

    //bring in value from search field
    const search = $('input').val();
    
    //get city and state and then clean up values
    const city = search.split(',')[0].trim();
    const state = search.split(',')[1].trim();
    
    //set up variables for coodinates
    let lon;
    let lat;
    //turn city name into coodinates
    
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},us&appid=ea02e1f93a0a208ae95fc700a4520980`)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            if(data.length != 0){
                lat = data[0].lat;
                lon = data[0].lon;
            }

        });

    //check if lon and lat have values == city exists
    if(!(lon == undefined && lat == undefined)){
        let weatherData
        fetch(`https://api.openweathermap.org/data/2.5/forecast?cnt=6&lat=${lat}&lon=${lon}&appid=ea02e1f93a0a208ae95fc700a4520980`)
        .then(function(response){
            weatherData = response.json();
        })
    }else{
        
    }

    

}

function renderPage(){
    //load history buttons

    //load last city info

}

function createCityButton(city){

}

function cityButtonClick(){
    // load weather info
    // set last city local storage
}







$(document).ready(function(){

    //if no local storage search history-make empty array
    if(searchHistory === null){
        searchHistory = [];
    }


    //set up button
    $('button').on('click',search);








});







$(document).ready(function () {
    
});