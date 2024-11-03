const express = require('express');
const ErrorHadelr = require('./utils/errorHandeler');
const userRouter = require('./routers/userRouter');
const app = express();

app.use(express.json());

app.use('/authApi/', userRouter)
app.use(ErrorHadelr);
module.exports = app;