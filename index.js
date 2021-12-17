const express = require("express");
const path = require("path");
const requests = require("requests");
const bodyParser = require('body-parser');
const app = express();

app.set("view engine", "hbs");

app.use(express.static(path.join(__dirname, "/public")));

// const button = document.querySelector("#search");
// const inputfield = document.querySelector(".takeinput");
// let city;
// button.addEventListener('click', () => {
//     city = inputfield.value;
// });
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get("*", (req, res) => {

    // res.render("weather");
    // let city='surat';
    // requests("http://api.openweathermap.org/data/2.5/weather?q=surat&appid=a3ca8441e71fb696fcec5e7d4ef1f366")
    //     .on("data", (defaultdata) => { data = [JSON.parse(defaultdata)];});
    
    fun=(city="surat")=> {
        requests(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a3ca8441e71fb696fcec5e7d4ef1f366`)
        .on("data", (apidata) => {
                data = JSON.parse(apidata);
                data = [data];
                // console.log(data);
                return res.render("weather", {
                    tempval: (data[0].main.temp - 273.15).toFixed(2),
                    speed: data[0].wind.speed,
                    Humidity: data[0].main.humidity,
                    location: data[0].name,
                    country: data[0].sys.country, 
                });
        });
    };

    app.post("/userinput", urlencodedParser, (req, res) => {
        
        let city = req.body.city;
        
        requests(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a3ca8441e71fb696fcec5e7d4ef1f366`)
        .on("data", (apidata) => {
                data = JSON.parse(apidata);
                data = [data];
                // console.log(data);
                res.render("weather", {
                    tempval: (data[0].main.temp - 273.15).toFixed(2),
                    speed: data[0].wind.speed,
                    Humidity: data[0].main.humidity,
                    location: data[0].name,
                    country: data[0].sys.country, 
                });
        }).on("error", (err) => {
            console.log("city not found");
        });
    });
    fun();

});



app.listen(8000, () => {
    console.log("started");
});