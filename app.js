require("./database/client");

const express = require('express');
const cors=require("cors");

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const auth = require("./authentication/auth");
const calenderItemRouter = require('./routes/calenderItemRouter');
const contactsRouter = require('./routes/contactsRouter');
const tasksRouter = require('./routes/tasksRouter');
const activityListRouter = require('./routes/activityListRouter');
const userRouter = require('./routes/userRouter');


const app = express();
/* console.log(process.env); */

const wellcome = async(req, res) => {
    return res.status(200).send("*****😀 Welcome 👐 to the root this app****");}
app.get("/", wellcome)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const corsOptions ={
    origin:
    
        'https://projectberlincalender.netlify.app'
,
    methods :["GET", "PUT", "POST","DELETE" ],
    credentials:true,            //access-control-allow-credentials:true
    
}
app.use(cors(corsOptions));





app.use('/calendar', auth, calenderItemRouter);
app.use('/contacts', auth, contactsRouter);
app.use('/tasks', auth, tasksRouter);
app.use('/activityList', auth, activityListRouter);
app.use('/users', userRouter);

module.exports = app;
