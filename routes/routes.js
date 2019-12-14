const express = require('express');
const moment = require('moment');
const adminModel = require('../models/model');
const router = express.Router();

router.get('/',(req,res)=>{
    res.render('home',{
        title: 'Home Page',
        style: ['home.css'],
        js: ['home.js']
    })
})
router.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Page',
        style: ['about.css'],
        js: ['home.js']
    })
})
router.get('/login',(req,res)=>{
    res.render('login',{
        title: 'Login Page',
        style: ['login.css'],
        js: ['login.js']
    })
})
router.get('/match',(req,res)=>{
    res.render('match',{
        title: 'Match',
        style: ['match.css'],
        js: ['home.js']
    })
})

router.get('/tournament',(req,res)=>{
    res.render('tournament',{
        title: 'Tournament',
        style: ['style.css'],
        js:['home.js']
    })
})

router.post('/tournament',async (req,res)=>{
    const entity = req.body;
    const startDate = entity.startDate_raw;
    const endDate = entity.endDate_raw;

    entity.dateStart = moment(startDate,'LL').format('YYYY-MM-DD');
    entity.dateEnd = moment(endDate,'LL').format('YYYY-MM-DD');

    delete entity.startDate_raw;
    delete entity.endDate_raw

    const result = await adminModel.add(entity);

    res.redirect('/');
})

module.exports = router;