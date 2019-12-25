module.exports=function(app){
    app.use((req, res, next) => {
        // res.render('vwError/404');
        res.send('You\'re lost');
    })
    
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('View error on console.');
    })
    
}