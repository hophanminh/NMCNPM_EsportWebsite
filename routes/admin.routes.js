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
    var detailmatch = {
        match_roundMatch: 0,
        match_branch: 0,
        match_tournament_idTournament: idTournament[0].max,
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
            detailmatch.match_roundMatch = 0;
            detailmatch.match_branch = 1;

        }
        if (i == 30){                
            match.roundMatch = 0;
            match.branch = 2;
            player_match.match_roundMatch = 0;
            player_match.match_branch = 2;
            detailmatch.match_roundMatch = 0;
            detailmatch.match_branch = 2;
        }
        match.roundMatch++;
        player_match.match_roundMatch++;
        detailmatch.match_roundMatch++;
        add = await adminModel.addMatch(match);
        add = await adminModel.addPlayer_Match(player_match);
        add = await adminModel.addDetailMatch(detailmatch);
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

router.use('/overview', express.static('public'));

router.get('/:idTournament/overview',async(req,res)=>{
    const rows = await adminModel.singleTournament(req.params.idTournament);
    console.log(rows[0]);
    res.render('addOverview',{
        tournament: rows[0],
        title: 'Add overview',
        style: ['style.css']
    })
})
router.post('/:idTournament/overview',async(req,res)=>{
    const entity = req.body;

    delete entity.nameTournament;
    delete entity.prizeTournament;
    delete entity.nameGame;

    entity.tournament_idTournament = req.params.idTournament;
    const result = await adminModel.addOverview(entity);
    console.log(entity);
    res.redirect('/');
})

module.exports = router;
