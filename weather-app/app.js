const request = require('request');

const url = 'http://api.weatherstack.com/current?access_key=5f3e73e3221c6cfcf23f374ea884091e&query=37.8267,-122.4233'

request({url: url, json: true }, (error, response) => {
    if(error){
        console.log('Unable to connect to weather service!')
    } else if (response.body.error) {
        console.log('Unable to find location')
    }else {
        const data = response.body;
        console.log(`It is currently ${data.current.temperature}. It feels like ${data.current.feelslike}`);
    }
});

const geoUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiaGVhZGVycHQiLCJhIjoiY2wwa3d4cGVjMDRzdzNvcGxmOGdpNmV2byJ9.vc9w-9jjvaWphDReHoZjqw&limite=1"
request({url: geoUrl, json: true}, (error, response) => {
    if(error){
        console.log('Failure to connect to connection services');
    }else {
        const data = response.body;
        if(data.features.length === 0){
            console.log('No location found');
        } else {
            console.log(data.features[0].center)    
        }
    }
})