const model = require('../models/model');

module.exports = function (app) {
  app.use(async (req, res, next) => {   

    const current = await model.getCurrentTournament();
    const list = await model.getIDAllTournament();

    res.locals.list = list;

    if (typeof (req.session.current) === 'undefined') {
      if (current.length == 0){
        req.session.current = 0;
      }
      else{
        req.session.current = current[0].max;
      }
    }
    res.locals.current = req.session.current;
    
    if (typeof (req.session.isAuthenticated) === 'undefined') {
      req.session.isAuthenticated = false;
    }
    res.locals.isAuthenticated = req.session.isAuthenticated;
    res.locals.authUser = req.session.authUser;
    next();
  })
};