const fs = require('fs');
const yargs = require('yargs');
const colors = require('colors');
const axios = require('axios');


const argv = yargs
    .options({
        address: {
            demand: true,
            alias: 'a',
            describe: 'Adres dla którego ma zostać podana prognoza pogody',
            string: true
        }
    })
    .help(undefined, 'Wyświetla ten ekran')
    .alias('help', 'h')
    .argv;

const secretKey = fs.readFileSync('secret-key.txt', 'utf-8');

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address');
    }

    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;

    var weatherUrl = `https://api.darksky.net/forecast/${secretKey}/${lat},${lng}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
}).then((response) => {
    var temperature = Math.round(5 / 9 * (body.currently.temperature - 32)),
    console.log(`Obecnie temperatura wynosi ${temperature}°C`.green)
}).catch((e) => {
    if (e.code === 'ENOTFOUND') {
        console.log('Unable to connect to Google Maps API')
    } else {
        console.log(e.message);
    }
})







