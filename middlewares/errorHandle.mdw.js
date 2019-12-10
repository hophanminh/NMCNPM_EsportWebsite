module.exports=function(app){
    app.use((req,res,next)=>{
        res.send('You are lost');
    })

    app.use((err,req,res,next)=>{
        console.error(err.stack);
        res.status.send('View error in console');
    })
}