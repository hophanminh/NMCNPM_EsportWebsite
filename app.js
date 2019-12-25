const express = require('express');
const morgan = require('morgan');
require('express-async-errors');
const session = require('express-session');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(session({
  secret: 'one two three four five',
  saveUninitialized: false,
  resave: false
}));

app.use(express.static('public'));

require('./middlewares/locals.mdw')(app);
require('./middlewares/engine.mdw')(app);
require('./middlewares/routes.mdw')(app);

require('./middlewares/errorHandle.mdw')(app);
app.listen(3000,()=>{
    console.log('Web is running at http://localhost:3000');
})
