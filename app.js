const express = require('express');
const ErrorHadelr = require('./utils/errorHandeler');
const userRouter = require('./routers/userRouter');
const session = require('express-session');

const app = express();


app.use(session({
    keys: ['key1'],
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 60 * 60 * 1000
    }
}))

app.use(express.json());

app.use('/authApi', userRouter)
app.use(ErrorHadelr);
module.exports = app;