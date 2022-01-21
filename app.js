const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require('express-session');
const PageRoute = require('./routes/PageRoute');
const CourseRoute = require('./routes/CourseRoute');
const CategoryRoute = require('./routes/CategoryRoute');
const UserRoute = require('./routes/UserRoute');
const MongoStore = require('connect-mongo');
const app = express();

//connect db
mongoose.connect('mongodb://localhost/smartedu-db').then(() => {
  console.log('db connected succesfully');
});

//template engine
app.set('view engine', 'ejs');

//global variable
global.userIN = null;

//middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'my_keyboard_cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/smartedu-db' }),
  })
);
app.use('*', (req, res, next) => {
  userIN = req.session.userID;
  next();
});

//routes
app.use('/', PageRoute);
app.use('/courses', CourseRoute);
app.use('/categories', CategoryRoute);
app.use('/users', UserRoute);

const port = 3000;

app.listen(port, () => {
  console.log(`app started on port ${port}`);
});
