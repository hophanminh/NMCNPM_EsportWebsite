const exphbs = require('express-handlebars');
const hbs_section = require('express-handlebars-sections')
const path = require('path');

module.exports=function(app){
    app.engine('hbs',exphbs({
        defaultLayout: 'main.hbs',
        layoutsDir: 'views/layouts',
        helpers:{
            section: hbs_section(),
        }
    }))
    
    app.set('view engine','hbs');
}