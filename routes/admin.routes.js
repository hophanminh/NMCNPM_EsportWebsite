const express = require('express');
const moment = require('moment');
const adminModel = require('../models/model');
const router = express.Router();
router.use('/tournament/', express.static('public'));

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
    
    // add empty match
    const idTournament = await adminModel.getCurrentTournament();
    var add;
    var match = {
        roundMatch: 0,
        branch: 0,
        statusMatch: 0,
        tournament_idTournament: idTournament[0].max
    }
    var player_match = {
        match_roundMatch: 0,
        match_branch: 0,
        match_tournament_idTournament: idTournament[0].max,
        player_idPlayer1: null,
        player_idPlayer2: null,
    }
    for (i = 1; i <= 31; i++) {     // branch: 0-winner, 1-loser, 2-final
        if (i == 16){               
            match.roundMatch = 0;
            match.branch = 1;
            player_match.match_roundMatch = 0;
            player_match.match_branch = 1;
        }
        if (i == 30){                
            match.roundMatch = 0;
            match.branch = 2;
            player_match.match_roundMatch = 0;
            player_match.match_branch = 2;
        }
        match.roundMatch++;
        player_match.match_roundMatch++;
        add = await adminModel.addMatch(match);
        add = await adminModel.addPlayer_Match(player_match);
    }   
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
