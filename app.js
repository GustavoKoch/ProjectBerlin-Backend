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
    [
        'http://localhost:3000','http://localhost:3001','http://localhost:3002','http://localhost:3003',
        'http://localhost:3030','http://localhost:3031','http://localhost:3032','http://localhost:3033', 
        'https://62f4be90041b0c000880f7e0--projectberlincalender.netlify.app/',
        'https://projectberlin-backend.herokuapp.com',
        'https://main--projectberlincalender.netlify.app/'
], 
    credentials:true,            //access-control-allow-credentials:true
    
}
app.use(cors(corsOptions));





app.use('/calendar', auth, calenderItemRouter);
app.use('/contacts', auth, contactsRouter);
app.use('/tasks', auth, tasksRouter);
app.use('/activityList', auth, activityListRouter);
app.use('/users', userRouter);

module.exports = app;
