const chalk = require("chalk");
const request = require("request");

/************WEATHER API V.2 */

//create the request for the response from weather stack

const forecast = (latitude, longitude, callback) => {
  const urlWeather =
    "http://api.weatherstack.com/current?access_key=af2cc23b1fc206803da107d49c13528c&query=" +
    latitude +
    "," +
    longitude +
    "&units=m"; // Johanasburg. Units:s=scientific, m= metric, f=farenheit; // Johanasburg. Units:s=scientific, m= metric, f=farenheit

  //original url: http://api.weatherstack.com/current?access_key=af2cc23b1fc206803da107d49c13528c&query=-26.2041,28.0473&units=m"; // Johanasburg. Units:s=scientific, m= metric, f=farenheit

  request({ url: urlWeather, json: true }, (error, response) => {
    if (error) {
      // want the response to be sent to callback
      callback("an error has occured, please check your internet connection");
    } else if (response.body.error) {
      callback("error in the url has occured please check it.", undefined);
    } else {
      //if data

      callback(
        undefined,

        /*   {

//method 1 //this was creating a object 

          location: response.body.location.region,
          localTime: response.body.location.localtime,
          temp: response.body.current.temperature,
          rain: response.body.current.precip,
          uv: response.body.current.uv_index,
          weatherDescription: response.body.current.weather_descriptions[0],
          

        }*/

        //method 2
        "Temperature currently is: " +
          response.body.current.temperature +
          " C." +
          " The uv index is: " +
          response.body.current.uv_index +
          ". The general weather is: " +
          response.body.current.weather_descriptions[0] +
          ". "
      );
    }
  });
};

module.exports = forecast;
