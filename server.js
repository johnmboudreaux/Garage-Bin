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

app.get('/api/v1/items', (request, response) => {
  database('garage_things').select()
    .then(items => response.status(200).json(items))
    .catch(error => response.status(500).json({error: `internal server error ${error}`}));
});

app.post('/api/v1/items', (request, response) => {
  const newItem = request.body;

  for (let requiredParameter of ['itemName', 'itemReason', 'itemCleanliness']) {
    if (!newItem[requiredParameter]) {
      return response.status(422).json({
        error: `you are missing the ${requiredParameter} property`
      });
    }
  }

  database('garage_things').insert(newItem, '*')
    .then(insertedItem => response.status(201).json(insertedItem))
    .catch(error => response.status(500).json({ error }));
});

app.post('/api/v1/', (request, response) => {

});

app.delete('/api/v1/', (request, response) => {

});

app.listen(app.get('port'), () => {
  console.log(`App is running on ${app.get('port')}.`);
});

module.exports = app;
