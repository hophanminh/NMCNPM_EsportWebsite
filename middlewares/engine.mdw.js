const exphbs = require('express-handlebars');
const path = require('path');

module.exports=function(app){
    app.engine('hbs',exphbs({
        defaultLayout: 'main.hbs',
        layoutsDir: 'views/layouts'
    }))
    
    app.set('view engine','hbs');
}