const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
var methodOverride = require('method-override');
const PageRoute = require('./routes/PageRoute');
const CourseRoute = require('./routes/CourseRoute');
const CategoryRoute = require('./routes/CategoryRoute');
const UserRoute = require('./routes/UserRoute');
const MongoStore = require('connect-mongo');
const app = express();

//connect db 
mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.rr45u.mongodb.net/smaredu-db?retryWrites=true&w=majority`).then(() => {
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
    store: MongoStore.create({ mongoUrl: `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.rr45u.mongodb.net/smaredu-db?retryWrites=true&w=majority` }),
  })
);
app.use('*', (req, res, next) => {
  userIN = req.session.userID;
  next();
});
app.use(flash());
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

//routes
app.use('/', PageRoute);
app.use('/courses', CourseRoute);
app.use('/categories', CategoryRoute);
app.use('/users', UserRoute);


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});