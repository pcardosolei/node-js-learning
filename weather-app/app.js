const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const address = process.argv[2];
if(!address){ return console.log('Please provide an address');}

geocode(address, (error, {latitude, longitude, location } = {}) => {
    if(error){
        return console.log(error);
    }

    // console.log(data);
    forecast(longitude, latitude, (error, forecastData) => {
        if (error) {
            console.log('Error', error)
        }
        console.log(location);
        console.log('Data', forecastData)
      })
})

