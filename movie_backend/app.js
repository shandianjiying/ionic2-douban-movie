/**
 * Created by ShaunJ on 17/1/17.
 */

const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')

//mongo的model 待模块化
const db = require('./model/db')
const user = require('./model/users')
const movie = require('./model/movies')

//路由设置 待模块化
const routes = require('./routes/index')
const users = require('./routes/users')
const movies = require('./routes/movies')

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/movies',movies);

app.use((err, req, res, next) => {
    // console.log(err.toString());
    let error = {
        message: err.message,
        content: err.stack,
        userAgent: req.get('user-agent'),
        path: req.url,
        UserId:req.UserId
    }

    if (process.env.NODE_ENV == 'production' || process.env.NODE_ENV == 'test') {
        console.log(error);
    } else {
        console.error(error);
    }
    if(err.status === 503){
        err.status = 500;
    }
    res.status(err.status || 500);
    res.json(error);
});

module.exports = app

// var MongoClient = require('mongodb').MongoClient
//     , assert = require('assert');
//
// // Connection URL
// var url = 'mongodb://localhost:27017/myTestDb';
//
// // Use connect method to connect to the server
// MongoClient.connect(url, function(err, db) {
//     assert.equal(null, err);
//     console.log("Connected successfully to server");
//     var collection = db.collection('myCollection');
//     collection.find().toArray(function(err,result){
//         console.log(result);
//     })
//     db.close();
// });