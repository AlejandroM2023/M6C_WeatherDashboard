
//bring in search history and last viewed city
let searchHistory = JSON.parse(localStorage.getItem('cityHistory'));
let lastCity = JSON.parse(localStorage.getItem('lastCity'));


function cityWeatherObj(city,state,longitude,latitude){
    this.city = city;
    this.state = state;
    this.longitude = longitude;
    this.latitude = latitude;
}

function displayWeatherInfo(obj){
    const currentArea = $('#current');
    const info = $('<h2>');
    info.text(`${obj.city}, ${obj.state} (${ dayjs().format('MM / DD / YYYY')})`);



    fetch(`https://api.openweathermap.org/data/2.5/forecast?cnt=6&lat=${obj.latitude}&lon=${obj.longitude}&units=imperial&appid=ea02e1f93a0a208ae95fc700a4520980`)
    .then(function(response){
        return response.json();
    }).then( function(data){

        //create all elements that require the data

        //make and add icon to h2
        const icon = $('<img>');
        icon.attr('src',`https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`);
        info.append(icon);

        //make and add temperature info
        const temp = $('<p>');
        temp.text(`Temp: ${data.list[0].main.temp}°F`);

        //make and add wind info
        const wind = $('<p>');
        wind.text(`Wind: ${data.list[0].wind.speed}MPH`);

        //make and add humidity info
        const humidity = $('<p>');
        humidity.text(`Humidity: ${data.list[0].main.humidity}%`);
        

        //append all infomartion
        currentArea.append(info,temp,wind,humidity);




    });



}


function search(){

    //bring in value from search field and error message area
    const search = $('input').val();
    const errors = $('#errors');
    errors.html('');
    
    if(search.split(',').length == 2){

        //get city and state and then clean up values
        const city = search.split(',')[0].trim();
        const state = search.split(',')[1].trim();
        
        //turn city name into coodinates
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},us&appid=ea02e1f93a0a208ae95fc700a4520980`)
        .then(function(response){
            if(response.ok){
                response.json().then(function(data){
                    if(data.length != 0){

                        //create a new object to use in multiple functions
                        const newCityInfo = new cityWeatherObj(data[0].name,data[0].state,data[0].lon,data[0].lat);

                        //add city button
                        createCityButton(newCityInfo);

                        //display data
                        displayWeatherInfo(newCityInfo);

                        //add to local storage
                        lastCity = newCityInfo;
                        localStorage.setItem('lastCity',JSON.stringify(lastCity));

                    }else{
                        console.log('inner');
                        errors.append('not a valid city');
                    }
                })
            }else{
                console.log('second');
                errors.append('not a valid city');
            }
        })

        
            
        
    }else{
        errors.append('not a valid city');
    }
    

}



function renderPage(){
    //load history buttons

    //load last city info

}

function createCityButton(obj){
    const city = searchHistory.find((element)=>element.city == obj.city);

    if(city == undefined || city.latitude != obj.latitude || city.longitude != obj.longitude){
        //bring in button list
        const btnList = $('#buttonHistory');

        // create button
        const newBtn = $('<button>');

        //add data attributes to store information for easier search
        newBtn.attr('data-city', obj.city);
        newBtn.attr('data-state', obj.state);

        //add bootsrap class fro styling
        newBtn.addClass('btn btn-primary my-2');

        //add text
        newBtn.text(`${obj.city},${obj.state}`);

        btnList.append(newBtn);

        //save to local storage
        searchHistory.push(obj);
        localStorage.setItem('cityHistory',JSON.stringify(searchHistory));
    }
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
    $('#search').on('click',search);








});



/*if(!(longitude == undefined && latitude == undefined)){
        let weatherData;
        fetch(`https://api.openweathermap.org/data/2.5/forecast?cnt=6&lat=${longitude}&lon=${latitude}&appid=ea02e1f93a0a208ae95fc700a4520980`)
        .then(function(response){
            weatherData = response.json();
        })
        console.log(weatherData);
    }else{
        errors.html('');
        errors.append('not a valid city');

    }*/