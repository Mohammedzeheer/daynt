const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('./config/mongoose');
require('dotenv').config();
const cors=require('cors')

const UserRouter = require('./routes/user');
const AdminRouter = require('./routes/admin');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  cors({
    origin: process.env.CLIENT_SIDE_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

app.use('/', UserRouter);
app.use('/admin', AdminRouter);


app.use(function(req, res, next) {
  next(createError(404));
});


const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = app;
