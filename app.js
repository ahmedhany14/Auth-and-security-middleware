const express = require('express');
const ErrorHadelr = require('./utils/errorHandeler');
const app = express();



app.use(ErrorHadelr);
module.exports = app;