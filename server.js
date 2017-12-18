const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

require('dotenv').config();

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));


app.post('/api/v1/authenticate', (request, response) => {

});

app.get('/api/v1/', (request, response) => {
  database('').select()
    .then(owners => response.status(200).json(owners))
    .catch(error => response.status(500).json({error: `internal server error ${error}`}));
});

app.get('/api/v1/owners/:id', (request, response) => {

});

app.get('/api/v1/homes', (request, response) => {

});

app.get('/api/v1/owners/:id/homes', (request, response) => {

});


app.post('/api/v1/owners', (request, response) => {

});

app.post('/api/v1/owners/:id/homes', (request, response) => {

});

app.put('/api/v1/owners/:id', (request, response) => {

});

app.put('/api/v1/homes/:id', (request, response) => {

});

app.delete('/api/v1/owners/:id', (request, response) => {

});

app.delete('/api/v1/homes/:id', (request, response) => {

});

app.listen(app.get('port'), () => {
  console.log(`App is running on ${app.get('port')}.`);
});

module.exports = app;
