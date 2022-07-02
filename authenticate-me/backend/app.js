//import packages
const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

//set environment and check production
const { environment } = require('./config');
const isProduction = environment === 'production';


//init express
const app  = express();

//import routes
const routes = require('./routes');

//init morgan middleware
app.use(morgan('dev'));
//init cookieParser middleware
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

module.exports = app;
