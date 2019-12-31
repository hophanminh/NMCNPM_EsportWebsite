const express = require('express');
const moment = require('moment');
const multer = require('multer');
const adminModel = require('../models/model');
const router = express.Router();
const fs = require('fs-extra');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = `./public/img`;
        return cb(null, dir);
    },
    filename: function (req, file, cb) {
            let filename = file.originalname;
            let fileExtension = filename.split(".")[1];
            cb(null, filename);
    },
});

const upload = multer({ storage });



router.get('/',async(req,res)=>{

    const rows = await adminModel.allPlayerByTournament(res.locals.current);

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

    if(rows[0].statusPlayer === 0)
        rows[0].branch = 'Win branch';
    else if (rows[0].statusPlayer === 1)
        rows[0].branch = 'Lose branch';
    else rows[0].branch = 'Out';

    let dob = rows[0].DoB;
    rows[0].DoBTemp = moment(dob).format('DD/MM/YYYY');

    console.log(rows);

    res.render('playerDetail',{
        player: rows[0],
        title: 'Detail Player',
        style: ['style.css'],
        js: ['home.js']
    })
})

router.get('/:idTournament/addPlayer',(req,res)=>{
    const idTournament = req.params.idTournament;
    res.render('addPlayer',{
        idTournament,
        title: "Add Player",
        style: ['style.css'],
    });
})
router.post('/:idTournament/addPlayer',async (req,res)=>{
    console.log(req.body);

    const DoB = moment(req.body.dob,'DD/MM/YYYY').format('YYYY-MM-DD');
    const entity = req.body;
    delete entity.dob;
    entity.DoB = DoB;
    entity.statusPlayer = 0;

    const result = await adminModel.addPlayer(entity);
    res.redirect('/player');
})

router.post('/:idTournament/addPlayerFile',upload.single('txtFile'),async (req,res)=>{
    console.log(req.body);    

    // const DoB = moment(req.body.dob,'DD/MM/YYYY').format('YYYY-MM-DD');
    // const entity = req.body;
    // delete entity.dob;
    // entity.DoB = DoB;
    // entity.statusPlayer = 0;

    // const result = await adminModel.addPlayer(entity);
    //res.redirect('/player');
    fs.readFile('player.txt', (e, data) => {
        if (e) 
            console.log('err');
        console.log(data);
    });
    res.send("arrive");
})

router.post('/:idPlayer/modify',async(req,res)=>{

    const entity = req.body;

    console.log(entity);

    entity.DoB = moment(entity.dob,'DD/MM/YYYY').format('YYYY-MM-DD');
    delete entity.dob;

    console.log(entity)
    const result = await adminModel.modifyPlayer(entity);
    console.log(result);
    res.redirect('/player');
})
router.post('/:idPlayer/delete',async(req,res)=>{
    const result = await adminModel.deletePlayer(req.params.idPlayer);
    res.redirect('/player');
})



module.exports = router;