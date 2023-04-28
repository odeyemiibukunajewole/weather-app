const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = 'b20f4ad066bd347d174137294a39ba49';
const lat = 6.4362
const lon = 3.4452
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs')

app.get('/', function (req, res) {
    res.render('index', { weather: null, error: null });
})

app.post('/', function (req, res) {
    let city = req.body.city.toUpperCase();
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`



    request(url, function (err, response, body) {
        if (err) {
            res.render('index', { weather: null, error: 'Error, please try again' });
        } else {
            let weather = JSON.parse(body)
            if (weather.main == undefined) {
                res.render('index', { weather: null, error: 'Error, please try again' });
            } else {
                res.render('index', { weather: weather.main, city, error: null });
            }
        }
    });
})

app.listen(4000, function () {
    console.log('Example app listening on port 4000!')
})