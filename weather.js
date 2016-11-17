const fs = require('fs');
const request = require('request');

const secretKey = fs.readFileSync('secret-key.txt','utf-8');

var getWeather = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/${secretKey}/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Nie mogę się połączyć z serwisem pogodowym');
        }
        else if (response.statusCode === 400) {
            callback('Nie można pobrać danych o pogodzie z serwisu pogodowego');
        }
        else if (response.statusCode === 200) {
            callback(undefined, {
                temperature: Math.round(5/9 * (body.currently.temperature  - 32)),
            });
        }
    });
}


module.exports.getWeather = getWeather;