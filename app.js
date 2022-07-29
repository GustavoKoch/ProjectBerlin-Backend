const express = require('express');
const cors=require("cors");

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require("dotenv").config();
require("./database/client");

const calenderItemRouter = require('./ROUTES/calenderItemRouter');
const contactsRouter = require('./ROUTES/contactsRouter');
const tasksRouter = require('./ROUTES/tasksRouter');
const activityListRouter = require('./ROUTES/activityListRouter');


const app = express();
/* console.log(process.env); */
app.use(cors());
const wellcome = async(req, res) => {
    return res.status(200).send("*****😀 Welcome 👐 to the root this app****");}
app.get("/", wellcome)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/calender', calenderItemRouter);
app.use('/contacts', contactsRouter);
app.use('/tasks', tasksRouter);
app.use('/activityList', activityListRouter);

module.exports = app;
