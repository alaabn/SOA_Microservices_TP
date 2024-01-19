const axios = require('axios');
const request = require('request');

const URL = process.env.BASE_URL + process.env.API_KEY;

/**
 *  Using Request
 * @param {*} city
 * @param {*} callback
 */
const getWeatherData_Request = (city, callback = print) => {
    const url = `${URL}&units=metric&lang=fr&q=${city}`;
    request(url, function (error, response, body) {
        if (error) {
            callback(error, null);
        } else {
            const weatherData = JSON.parse(body);
            callback(null, weatherData);
        }
    });
}
/**
 *
 * @param {*} err
 * @param {*} data
 * @returns
 */
const print = (err, data) => console.log(`
    ***********************************
    *********** Request_lib ***********
    ***********************************

    Description: ${data.weather[0].description}
    Température: ${data.main.temp} °C
    Humidité: ${data.main.humidity}
`);

/**
 * Using Axios
 * @param {*} city
 */
const getWeatherData_Axios = async (city) => {
    try {
        const response = await axios.get(URL, {
            params: {
                q: city,
                units: "metric",
                lang: "fr"
            }
        });
        console.log(`
    ***********************************
    ************ Axios_lib ************
    ***********************************

    Description: ${response.data.weather[0].description}
    Température: ${response.data.main.temp} °C
    Humidité: ${response.data.main.humidity}
        `);
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    getWeatherData_Axios, getWeatherData_Request
};

