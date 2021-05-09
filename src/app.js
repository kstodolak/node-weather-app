const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require("./utils/forecast");

//express initialization
const app = express();
const port= process.env.PORT || 3001;

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '..', 'public');
const viewsPath = path.join(__dirname, '..', 'templates', 'views');
const partialsPath = path.join(__dirname, '..', 'templates', 'partials');

//Set handlebars engine and views directory location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))



app.get('', (request, response) => {
    response.render(
        'index',
        {
            title: 'Weather',
            name: 'Kacper Stodolar'
        }
    )
});

app.get('/help', (request, response) => {
   response.render(
       'help',
       {
           title: 'Help',
           helpText : 'Just type address to input and click search button.',
           name: 'Kacper Stodolar'
       }
   )
});

app.get('/about', (request, response) => {
    response.render(
        'about',
        {
            title: 'About',
            name: 'Kacper Stodolar'
        }
    );
});

app.get('/weather', ({query}, response) => {
    if(!query.address){
        return response.send({
            error: 'No required query parameter: adress'
        });
    }
    forecast(
        query.address,
        (resp, translation) => {
            return response.send({
                address: query.address,
                forecast: resp,
                translation
            });
        },
        err => {
            return response.send({
                error: err
            });
        }
    );
});

//404 pages
app.get('/help/*', (request, response)=>{
    response.render(
        'notFound',
        {
            title: 'Help hage not found',
            link: '/help',
            linkText: 'Go to main help page'
        }
    );
});

app.get('*', (request, response) => {
    response.render(
        'notFound',
        {
            title: 'Page not found',
            link: '/',
            linkText: 'Go to home page'
        }
    );
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});