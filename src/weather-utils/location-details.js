const request = require('request')
const chalk = require('chalk')


/*********LOCATION API -version 2 ***************** */


const geoCode = (address, callback) => {
    //this is the custom, error and the response (data)
  
    const urlMAP =
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
      encodeURIComponent(address) +
      ".json?access_token=pk.eyJ1IjoiYXNzYWVsIiwiYSI6ImNrZHUwZDdmbjIycmgyeHRhYjU4ODN5bWwifQ.ea-bfqoG4hLwcgS_y1xa5A&limit=1";
    //the addition "enocode..." allows one to enter other characters so that mapbox can read it, eg: '?' becomes %3F
  
    request({ url: urlMAP, json: true }, (error, {body}) => { //the {body} is ES6 destructering
      if (error) {
        // if a error occurs
  
        callback("connection error", undefined); //the second one is for the second input into the call back
      } else if (body.features.length === 0) { //error
        callback("unable to find location",undefined);
      } else { //working well
        callback(undefined, {
          location: body.features[0].place_name,
          latitude: body.features[0].center[1],
          longitude: body.features[0].center[0],
        });
      }
    });
  };



  module.exports = geoCode;