const path = require("path");
const express = require("express");
const hbs = require("hbs");
const chalk = require("chalk");
const forecast = require("./weather-utils/weather-details.js");
const geoCode = require("./weather-utils/location-details.js");

const app = express();

//Define Paths for Express Config.
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views"); //absolute path of our custom directory
const partialsPath = path.join(__dirname, "../templates/partials");
console.log(path.join(__dirname)); //testing the directory locations

//Setup handlebars and views location
app.set("view engine", "hbs"); //telling express which template engine we are using, ie. hbs
app.set("views", viewsPath); //this is directing express to look into this folder to find the index file
hbs.registerPartials(partialsPath); //this provides the path to the partials

//setup static dierctory to serve
app.use(express.static(publicDirectoryPath)); //access to CSS file

//home page
app.get("", (req, res) => {
  res.render("index", {
    title: "home",
    name: "Assael Stein",
  });
});
//getting the location from geoCode:

//console.log("please input location for weather report")//

//weather page
app.get(
  "/weather/places",
  (req, res) => {
    const inputLocation = req.query.search;

    if (!inputLocation) {
      console.log(chalk.red("no input, please input a location"));
      return res.send({ error: "enter a query string: ?search=[place name]" });
    }
    geoCode(
      inputLocation,
      (
        error,
        { latitude, longitude, location } = {}
      ) /*this is settingg up default for the destructuring of the object*/ => {
        //this is the callback //change the location place searching

        forecast(latitude, longitude, (error, forecastData) => {
          console.log(location); //location info
          console.log(forecastData); //weather info
          res.send({ forecast: forecastData, location: location });
        });
      }
    );
  }

  /*
  res.send({
    location: "place x",
    weather: [],
    address: req.query.search,
  });*/
);

//Johannesburg

//weather page
app.get("/weather", (req, res) => {
  if (!req.query.search) {
    return res.render("weather", {
      title: "Weather",
      location: "",
    });
  }

  res.send({
    location: "place x",
    weather: [],
    address: req.query.search,
  });
});

//products
app.get("/products", (req, res) => {
  if (!req.query.search) {
    //only run when no search term
    return res.send({
      error: "You need to provide a search term",
    });
  }

  console.log(req.query), //req.query.search
    res.send({
      products: [],
    });
});

//regarding quer string in a URL, starts with "?" and then need to add key value pairs
//the qyery string is related to the req. variable
//eg: localhost:3000/weather?search=perth

//about page
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Shulchan Aruch",
  });
});

//help page
app.get("/help", (req, res) => {
  res.render("help", {
    title: "help",
    name: "see Shulchan Aruch",
  });
});

//Shabbat Times
app.get("/shabbat", (req, res) => {
  if (req.query.search === 0) {
    res.send({ error: "pleae provide location value" });
  } else {
    res.render("shabbat", {
      title: "Shabbat Times",
      name: "Torah",
    });
  }
});

//404 page for sub pages of help
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMsg: "help sub-section not found  ",
  });
});

//'*' is for wildcard, no page exists for this link
//standard error page
app.get("*", (req, res) => {
  res.render("404", {
    //name of the file
    title: "404",
    errorMsg: "page not found",
    name: "",
  });
});

//listening
app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
//use this to check which ports are running: sudo lsof -i :3000
//then canterminate via: kill -9 PID
//lsof -t -i tcp:3000 | xargs kill ; this kills everything running

//regarding "nodemon", can add other files to watch via: nodemon [file name] -e js,hbs,etc.; the -e is for extension
// bu, need to run it from the higher level file which includes the js and hbs files, in this case: nodemon src/app.js -e js,hbs
//heroku login -i
 