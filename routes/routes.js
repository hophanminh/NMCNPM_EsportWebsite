const express = require('express');
const productModel = require('../models/model');
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

module.exports = router;