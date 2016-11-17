const request = require('request');
const yargs = require('yargs');
const colors = require('colors');

const geocode = require('./geocode');
const weather = require('./weather');

const argv = yargs
    .options({
        address: {
            demand: true,
            alias: 'a',
            describe: 'Adres dla którego ma zostać podana pogoda',
            string: true
        }
    })
    .help(undefined, 'Wyświetla ten ekran')
    .alias('help', 'h')
    .argv;

geocode.geocodeAddress(argv.address, (errorMessage, result) => {
    if (errorMessage) {
        console.log(errorMessage.red);
    } else {
        console.log(result.address);
        weather.getWeather(result.latitiude, result.longitude, (errorMessage, weatherResult) => {
            if (errorMessage) {
                console.log(errorMessage)
            } else {
                console.log(`Obecnie temperatura wynosi ${weatherResult.temperature}°C`.green)
            }
        })

    }
});






