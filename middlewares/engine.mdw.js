const exphbs = require('express-handlebars');
const hbs_section = require('express-handlebars-sections')
const path = require('path');
const numeral = require('numeral');
const moment = require('moment');

module.exports=function(app){
    app.engine('hbs',exphbs({
        defaultLayout: 'main.hbs',
        layoutsDir: 'views/layouts',
        helpers:{
            section: hbs_section(),
            if_eq: function(a, b, opts) {
                if(a == b) // Or === depending on your needs
                    return opts.fn(this);
                else
                    return opts.inverse(this);
            },
            formatMoney: val => numeral(val).format('0,0[.]00') + ' VNĐ',
            formatDate: val => moment(val).format('DD/MM/YYYY'),



        }
    }))
    
    app.set('view engine','hbs');
}