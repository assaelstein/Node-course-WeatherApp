//when installing the npm package 'request' must first run: npm init, and then: npm i request
const chalk = require("chalk");
const request = require("request");
const geoCode = require("./location-details");
const forecast = require("./weather-details");
const { argv } = require("process");

//console.log("please input location for weather report")//

const inputLocation = process.argv[2];

//Johannesburg

if (!inputLocation) {
  console.log(chalk.red("no input, please input a location")); // why, there still exists data in argv???
} else {
  geoCode(inputLocation, (error, { latitude, longitude, location }) => {
    //this is the callback //change the location place searching
    if (error) {
      return console.log("error", error); //return makes the code stop after printing
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return console.log("Error", error);
      }
      console.log(latitude);
      console.log(longitude); //for precise location data

      console.log(location); //location info
      console.log(forecastData); //weather info
    });
  });
}



/******input from the user */
/*

process.argv
process.argv[] //argv is the argument vector, process.argv is the way to access that array from pure node code 


*/

/******************************************************************************** */

/*

  //call back for LOCATION/MAP API v.2
  
  geoCode("Johanesburg", (error, data) => {  //this is the callback //change the location place searching


    forecast(data.longitude,data.latitude, (error, data) => { //how does it know which data.[] ? there are two, geocode and forecast
      console.log(chalk.red("weather services"))
    
   
      
    
      if (error) {
        console.log("Error", error);
      } else {
      
        console.log("Data", data);
      }
    });


    console.log(chalk.blue("location services")) //location callback 
    if (error) {
      console.log("error", error);
    } else {
      console.log("data", data);
    }
  });





*/

/***********WEATHER API- version 1************************************************************************************** */

/*
const url =
  "http://api.weatherstack.com/current?access_key=af2cc23b1fc206803da107d49c13528c&query=-26.2041,28.0473&units=m"; // Johanasburg. Units:s=scientific, m= metric, f=farenheit



   //call-back function
request({ url: url, json: true }, (error, response) => {  //json:true -> automatically parses the responses. the error is a low level error service for internet connection etc.
 
  //console.log(error)

  if(error)// meaning, if 'error' is true
  {console.log('An error has occured. Please check your internet connection.')}

else if (response.body.error) {
  
  console.log('unable to find location, please check URL input data')}

else{
  const location = response.body.location.region
  const localTime = response.body.location.localtime
  const temp = response.body.current.temperature
  const rain = response.body.current.precip
  const uv = response.body.current.uv_index
  const weatherDescription = response.body.current.weather_descriptions

  //const data = JSON.parse(response.body); //to convert from String to an object, use JSON.parse()
 console.log(chalk.bgRedBright('Weather'))
 
  console.log('Location: ' + location); //for all details use: .current
  console.log(
    "the weather today is:" +
      weatherDescription +
      "." +
      "it is currently: " +
      temp +
      "C and there is a:" +
      rain +
      "% of rain." + " UV index of: " + uv + ". Local time is: " + localTime);
  }
});

*/

/*********LOCATION API -version 1 ***************** */
//note, spelling of Johannessburg, Gauteng,

/*
const urlMap =
  "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiYXNzYWVsIiwiYSI6ImNrZHUwZDdmbjIycmgyeHRhYjU4ODN5bWwifQ.ea-bfqoG4hLwcgS_y1xa5A&limit=1";
//"limit" number of responses, max 10 per request

request({ url: urlMap, json: true }, (error, response) => {
  //the "json:true" ->parses the result

  if (error) {
    //if there exists an error
    console.log("an error has occure, please check your internet connection.");
  } else if (response.body.features.length === 0) {
    console.log("an erro has occured, please check the URL input");
  } else {
    const location = response.body.features[0].place_name;
    const latitude = response.body.features[0].center[1];
    const longitude = response.body.features[0].center[0];

    console.log(
      chalk.green("geoLocation information for: ") + chalk.blue(location)
    );
    //console.log((response.body.features)); //seems that can;t use chalk on this -why?
    console.log("Latitude is: " + latitude);

    console.log("longitude is: " + longitude);
  }
});


*/

//Shabbat Times API

/*

//Shabbat Times for JHB
const url_2 = "https://www.hebcal.com/shabbat?cfg=json&geonameid=993800&m=50";

request({ url: url_2, json: false }, function (error, response, body) {

  console.log(chalk.green("START"));
  console.error("error:", error); // Print the error if one occurred
  //console.log(chalk.green("statusCode:", response )); // Print the response status code if a response was received

  const shbbtData = JSON.parse(body)

  console.log(chalk.red((body))); 
  //console.log(chalk.green((body)));
});

*/
