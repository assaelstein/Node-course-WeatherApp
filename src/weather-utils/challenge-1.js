//Map Box
const request = require("request");
const chalk = require("chalk");

const urlMap =
  "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiYXNzYWVsIiwiYSI6ImNrZHUwZDdmbjIycmgyeHRhYjU4ODN5bWwifQ.ea-bfqoG4hLwcgS_y1xa5A&limit=1";
//"limit" number of responses, max 10 per request


 request({ url: urlMap, json: true},(error, response) => { //the "json:true" ->parses the result
  
  const location = response.body.features[0].place_name
  const latitude = response.body.features[0].center[1]
  const longitude = response.body.features[0].center[0]
  
  
  console.log(("geoLocation information for: " + chalk.blue(location)));
    //console.log((response.body.features)); //seems that can;t use chalk on this -why?
    console.log('Latitude is: ' + latitude )
    
    console.log('longitude is: ' + longitude)
   

  }
);











   