const nodeFetch = require('node-fetch');

const translate = text => {
    return nodeFetch(
        'https://wsbe-machine-translation-v1.p.rapidapi.com/api/mt/v1/translate',
        {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'x-rapidapi-key': '6dc929fb05msh8a0e6b8dcae4ed3p16de2bjsn795d8a9df035',
                'x-rapidapi-host': 'wsbe-machine-translation-v1.p.rapidapi.com'
            },
            data: {
                lang: 'en-pl',
                text: text
            }
        }
    ).then(resp => resp.json());
}

module.exports = translate;