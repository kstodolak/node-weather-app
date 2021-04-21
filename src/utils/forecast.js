const nodeFetch = require('node-fetch');
const uriBase = 'http://api.weatherstack.com/current?access_key=a6d307b97df9a313f5068cd742afd31b&language=pl';


const forecast = (address, success, fail) => {
    nodeFetch(
        `${uriBase}&query=${encodeURIComponent(address)}`,
        {
            method: 'GET'
        }
    )
        .then(resp => resp.json())
        .then(resp => success(resp))
        .catch(err => fail(err));
}

module.exports = forecast;