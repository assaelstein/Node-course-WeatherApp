const weatherForm = document.querySelector("form"); //this is grabbing the html form and leting us access it in JS
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

//messageOne.textContent = "from JS";

//messageTwo.textContent = "loading";

weatherForm.addEventListener("submit", (e) => {
  //e for event,its a callback
  e.preventDefault();

  const location = search.value; //value extracts the typed value

  const url = "/weather/places?search=" + location; //changed it so can also run on Heroku
  messageOne.textContent = "";
  messageTwo.textContent = "loading...";

  fetch(url).then((result) => {
    result.json().then((data_weather) => {
      if (data_weather.error) {
        console.log("error,please try again");
        messageTwo.textContent = "error try again";
      } else if (data_weather.forecast === undefined) {
        console.log("error try again");
        messageOne.textContent = "";
        messageTwo.textContent = "error try again";
      } else {
        //debugger;

        console.log(data_weather.location);
        console.log(data_weather.forecast);
        console.log(data_weather.latitude);
        console.log(data_weather.longitude);
        //including data for location

        messageOne.textContent =
          "Latitude and Longitude are:  is: " +
          data_weather.latitude +
          "," +
          data_weather.longitude;

        (" | "); //data_weather.location;

        messageTwo.textContent =
          "the location is: " +
          data_weather.location +
          " | " +
          " The weather is: " +
          data_weather.forecast;

        /* messageTwo.textContent =
          "temperature: " +
          data_weather.temperature +
          ". Weather description: " +
          data_weather.weatherDescription;

         */

        console.log(data_weather.location);
        console.log(data_weather);
      }
    });
  });
}); //two arguements, the event which we want to listen and the 2nd is callback function
