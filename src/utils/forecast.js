const nodeFetch = require('node-fetch');
const translate = require('./translate');
const uriBase = 'http://api.weatherstack.com/current?access_key=a6d307b97df9a313f5068cd742afd31b';


const forecast = (address, success, fail) => {
    nodeFetch(
        `${uriBase}&query=${encodeURIComponent(address)}`,
        {
            method: 'GET'
        }
    )
        .then(resp => resp.json())
        .then(async resp => {
            const translatedText = await translate('Partly cloudy');
            success(resp,translatedText);
        })
        .catch(err => fail(err));
}

module.exports = forecast;