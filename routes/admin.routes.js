const express = require('express');
const moment = require('moment');
const adminModel = require('../models/model');
const router = express.Router();

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

    entity.dateStart = moment(startDate,'DD/MM/YYYY').format('YYYY-MM-DD');
    entity.dateEnd = moment(endDate,'DD/MM/YYYY').format('YYYY-MM-DD');

    delete entity.startDate_raw;
    delete entity.endDate_raw

    const result = await adminModel.add(entity);
    
    res.redirect('/');
})

router.post('/tournament/:idTournament/modify',async(req,res)=>{

    const entity = req.body;
    const startDate = entity.startDate_raw;
    const endDate = entity.endDate_raw;

    console.log(entity);

    entity.dateStart = moment(startDate,'DD/MM/YYYY').format('YYYY-MM-DD');
    entity.dateEnd = moment(endDate,'DD/MM/YYYY').format('YYYY-MM-DD');

    delete entity.startDate_raw;
    delete entity.endDate_raw

    console.log(entity);

    const result = await adminModel.modifyTournament(entity);

    console.log(result);

    res.redirect('/listTournament');
})

router.post('/tournament/:idTournament/delete',async(req,res)=>{

    const result = await adminModel.deleteTournament(req.params.idTournament);

    console.log(result);
    res.redirect('/listTournament');
})

module.exports = router;
