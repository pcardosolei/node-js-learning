const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=5f3e73e3221c6cfcf23f374ea884091e&query=${latitude},${longitude}`

    request({ url, json: true}, (error, { body }) => {
        if(error){
            callback('Unable to connect to weather service!');
        } else {
            if(body.error){
                callback('Unable to find location');
            } else {
                callback(null, `It is currently ${body.current.temperature}. It feels like ${body.current.feelslike}`)    
            }
        }
    })
}


module.exports = forecast;