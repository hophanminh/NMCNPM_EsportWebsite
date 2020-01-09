const express = require('express');
const moment = require('moment');
const multer = require('multer');
const adminModel = require('../models/model');
const router = express.Router();
const fs = require('fs-extra');
const util = require('util');

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


router.use('/', express.static('public'));

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

    const dobP = moment(req.body.dob,'DD/MM/YYYY').format('YYYY-MM-DD');
    const entity = {
        usernamePlayer: req.body.usernamePlayer,
        realnamePlayer: req.body.realnamePlayer,
        DoB: dobP,
        tournament_idTournament: req.body.tournament_idTournament,
    };
    const result = await adminModel.addPlayer(entity);
    res.redirect('/player');
})

router.post('/:idTournament/addPlayerFile', async (req,res)=>{                                                                        //correct format :
    function trim(str) {                                                //usernamePlayer1, realnamePlayer2, DoB1
        return str.replace(/^\s+|\s+$/g,"");                            //usernamePlayer1, realnamePlayer2, DoB2
    }
    console.log(req.body);   
    var lines = req.body.lists.split(/\r?\n/).filter(x => x); 
    for (i = 0;i< lines.length;i++){
        var words = lines[i].split(',').filter(x => x); 
        if (words.length != 3){
            continue;
        }

        const entity = {
            usernamePlayer: trim(words[0]),
            realnamePlayer: trim(words[1]),
            DoB: trim(words[2]),
            statusPlayer: 2,
            tournament_idTournament: req.params.idTournament
        }
        await adminModel.addPlayer(entity);
        console.log(entity);
    }
    res.send("1");
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