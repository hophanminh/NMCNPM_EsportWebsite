module.exports = function(app){
    app.use('/',require('../routes/routes'));
    app.use('/player',require('../routes/player.routes'));
}