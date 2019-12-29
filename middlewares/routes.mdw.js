const restrictAdmin = require('../middlewares/UserOnly.mdw');

module.exports = function(app){
    app.use('/',require('../routes/routes'));
    app.use('/player',require('../routes/player.routes'));
    app.use('/admin',restrictAdmin,require('../routes/admin.routes'));
}