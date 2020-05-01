const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const nocache = require('nocache');

const app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(nocache());
app.use(bodyparser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/dist/'));

require('./startup/db')(app);
require('./startup/routes')(app);

if (process.env.NODE_ENV == 'production') {
  require('./startup/prod')(app);
}


module.exports = app;
