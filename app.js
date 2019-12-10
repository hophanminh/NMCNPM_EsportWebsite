const express = require('express');
const morgan = require('morgan');
require('express-async-errors');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static('public'));


require('./middlewares/routes.mdw')(app);
require('./middlewares/engine.mdw')(app);
// app.get('/',(req,res)=>{
//     res.render('home',{
//         title: 'Home',
//         style: 'home.css',
//         js: 'home.js',
//     })
// })

require('./middlewares/errorHandle.mdw')(app);
app.listen(3000,()=>{
    console.log('Web is running at http://localhost:3000');
})
