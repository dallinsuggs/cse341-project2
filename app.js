const path = require('path')
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')


//module to connect to DB
const connect = require('./db/connect');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

//Passport config
require('./passport')(passport);

const app = express();

//Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

//Handlbars
app.engine('.hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs')

//Sessions
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.DB_URI
  })
}))

//Passport middleware
app.use(passport.initialize())
app.use(passport.session())

//static folder
app.use(express.static(path.join(__dirname, 'public')))

const port = process.env.PORT || 3000;

connect.initDatabase();

app
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use('/', require('./routes/'));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
