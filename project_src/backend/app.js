//import packages
const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf'); // csurf protection
const helmet = require('helmet'); //security middleware
const cookieParser = require('cookie-parser');

//set environment and check production
const { environment } = require('./config');
const isProduction = environment === 'production';


//init express
const app  = express();

//import routes
const routes = require('./routes');

// import validation error handler
const { ValidationError } = require('sequelize');

//init morgan middleware logging information about server request/responses
app.use(morgan('dev'));
//init cookieParser middleware parsing cookies from requests
app.use(cookieParser());
//init express middleware for json body parsing.
app.use(express.json());

//Security middleware
if(!isProduction) {
    app.use(cors());
}
//init helmet security
app.use(
    helmet.crossOriginResourcePolicy({
        policy : 'cross-origin'
    })
);

//set csrf token and create req.csrf method
app.use(
    csurf({
        cookie : {
            secure : isProduction,
            sameSite : isProduction && 'Lax',
            httpOnly : true
        }
    })
);

//test route
app.use(routes)

//rerource-not found middleware
app.use((_req, _res, next) => {
    const err = new Error("The requsted resources couldn't be found.");
    err.title = 'Resource Not Found';
    err.errors = ["The requested resources couldn't be found"];
    err.status = 404;
    next(err);
})

// Process sequelize errors
app.use((err, _req, _res, next) =>{
    if(err instanceof ValidationError){
        err.errors = err.errors.map((e) => e.message);
        err.title = 'Validation error';
    }
    next(err);
});

// Error formatter

app.use((err, _req, res, _next) => {
    res.statusCode(err.status || 500);
    console.error(err);
    res.json({
        title : err.title || 'Server Error',
        message : err.message,
        errors : err.errors,
        stack : isProduction ? null : err.stack
    });
});

module.exports = app;
