// require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const { join } = require('path');
const app = express();

app.use(logger('dev'));
app.use(express.static(join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(require('./routes'));

require('./config')
  .then(() => app.listen(process.env.PORT || 3000))
  .catch((err) => console.error(err));
