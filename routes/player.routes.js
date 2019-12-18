const express = require('express');
const moment = require('moment');
const adminModel = require('../models/model');
const router = express.Router();

router.get('/',async(req,res)=>{

    const rows = await adminModel.allPlayer();

    for(i=0;i<rows.length;i++)
    {
        if(rows[i].statusPlayer === 0)
            rows[i].branch = 'Win branch';
        else if (rows[i].statusPlayer === 1)
            rows[i].branch = 'Lose branch';
        else rows[i].branch = 'Out';

        let dob = rows[i].DoB;
        rows[i].DoB = moment(dob).format('LL');
    }

    console.log(rows);

    res.render('listPlayer',{
        player: rows,
        title: 'List Player',
        style: ['listPlayer.css'],
        js: ['home.js']
    })
})

router.use('/:idPlayer', express.static('public'));

router.get('/:idPlayer',async(req,res)=>{

    const rows = await adminModel.detailPlayer(req.params.idPlayer);

    console.log(rows);

    if(rows.statusPlayer === 0)
        rows.branch = 'Win branch';
    else if (rows.statusPlayer === 1)
        rows.branch = 'Lose branch';
    else rows.branch = 'Out';

    let dob = rows.DoB;
    rows.DoBTemp = moment(dob).format('DD-MM-YYYY');

    console.log(rows);

    res.render('playerDetail',{
        player: rows[0],
        title: 'Detail Player',
        style: ['style.css'],
        js: ['home.js']
    })
})

router.post('/:idPlayer',async(req,res)=>{

    const entity = req.body;

    console.log(entity);

    entity.DoB = moment(entity.dob,'DD/MM/YYYY').format('YYYY-MM-DD');
    delete entity.dob;

    console.log(entity)
    const result = await adminModel.modifyPlayer(entity);
    console.log(result);
    res.redirect('/player');
})



module.exports = router;