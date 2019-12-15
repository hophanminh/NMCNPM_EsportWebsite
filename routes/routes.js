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
router.post('/',async (req,res)=>{
    const data = req.body;

    var listWin = [];
    var listLose =[];
    var listFinal =[];
    var count = 1;
    // winner
    const winnerBracket = [];
    const winnerMatch = data.teams;
    for (i = 0; i < data.results[0].length; i++){
        listWin.length = 0
        round = data.results[0][i];

        for (j = 0; j < round.length; j++){ 
            // get data
            player1 = winnerMatch[j][0],
            player2 = winnerMatch[j][1],
            s1 = round[j][0];
            s2 = round[j][1];

            // remove loser and keep winner
            if (s1 == null || s2 == null || s1 == s2){
                listWin.push(null);
                listLose.push(null);
            }
            else if (s1 > s2){
                listWin.push(player1);
                listLose.push(player2);
            }
            else{
                listWin.push(player2);
                listLose.push(player1);
            }

            winnerBracket.push({
                match_roundMatch: count,
                match_branch: 0,
                player_idPlayer1: player1.ID,
                player_idPlayer2: player2.ID,
                score1: s1,
                score2: s2,
            })
            count++;
        }
        // pair 2 player to create 1 match
        winnerMatch.length = 0
        for (k = 0; k < listWin.length; k = k + 2){
            winnerMatch.push(
                [listWin[k], listWin[k+1]]
            )
        }
    }

    listFinal = listFinal.concat(listWin);
    count = 1;
    //loser
    var reverse = true;    // loser reverse then add to loserBracket
    const loserBracket = [];
    const loserMatch = [];
    listWin = listLose.splice(0,8);
    for (i = 0; i < data.results[1].length; i++){
        // check if there is player from winner Bracket
        loserMatch.length = 0;
        if (i % 2 != 1){
            for (k = 0; k < listWin.length; k = k + 2){
                loserMatch.push(
                    [listWin[k], listWin[k+1]]
                )
            }
        }
        else{
            // add new loser to list 
            for (k = 0; k < listWin.length; k++){
                if (reverse){
                    loserMatch.push(
                        [listWin[k], listLose[listWin.length - 1 - k]]
                    )
                }
                else{
                    loserMatch.push(
                        [listWin[k], listLose[k]]
                    )
                }
            }
            reverse = !reverse;
            listLose.splice(0,listWin.length);
        }
        listWin.length = 0;
        round = data.results[1][i];

        for (j = 0; j < round.length; j++){ 
            // get data
            player1 = loserMatch[j][0],
            player2 = loserMatch[j][1],
            s1 = round[j][0];
            s2 = round[j][1];

            // remove loser and keep winner
            if (s1 == null || s2 == null || s1 == s2){
                listWin.push(null);
                listLose.push(null);
            }
            else if (s1 > s2){
                listWin.push(player1);
                listLose.push(player2);
            }
            else{
                listWin.push(player2);
                listLose.push(player1);
            }

            loserBracket.push({
                match_roundMatch: count,
                match_branch: 1,
                player_idPlayer1: player1.ID,
                player_idPlayer2: player2.ID,
                score1: s1,
                score2: s2,
            })
            count++;
        }
    }
    
    listFinal = listFinal.concat(listWin);

    //final
    const finalBracket = [];

    round = data.results[2][0];

    finalBracket.push({
        match_roundMatch: 1,
        match_branch: 2,
        player_idPlayer1: listFinal[0].ID,
        player_idPlayer2: listFinal[1].ID,
        score1: round[0][0],
        score2: round[0][1],
    })
    finalBracket.push({
        match_roundMatch: 2,
        match_branch: 2,
        player_idPlayer1: listLose[listLose.length - 2].ID,
        player_idPlayer2: listLose[listLose.length - 1].ID,
        score1: round[1][0],
        score2: round[1][1],
    })

    for (const item of winnerBracket) {
        const result = await adminModel.patchBracket(item);
    }
    for (const item of loserBracket) {
        const result = await adminModel.patchBracket(item);
    }
    for (const item of finalBracket) {
        const result = await adminModel.patchBracket(item);
    }
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