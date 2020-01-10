const express = require('express');
const moment = require('moment');
const adminModel = require('../models/model');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const GuestOnly = require('../middlewares/GuestOnly.mdw');
const UserOnly = require('../middlewares/UserOnly.mdw');
const { check, validationResult } = require('express-validator');

const router = express.Router();
router.use('/login', express.static('public'));
router.use('/register', express.static('public'));
router.use('/match/:idTournament/:branch/:round', express.static('public'));
router.use('/match/:idTournament/:branch/:round/modify', express.static('public'));

router.get('/', async (req,res)=>{
    const idTournament = res.locals.current;
    const editable = req.query.editable || 0;
    const [data, upcoming, finished, statusTournament] = await Promise.all([
        adminModel.getBracketData(idTournament),
        adminModel.getUpcomingMatch(idTournament),
        adminModel.getFinishedMatch(idTournament),
        adminModel.statusTournament(idTournament),
    ])

    console.log(data);
    if (upcoming.length > 0){
        upcoming[0].date = moment(upcoming[0].date).format('MMMM Do YYYY, h:mm');
    }
    if (finished.length > 0){
        finished[0].date = moment(finished[0].date).format('MMMM Do YYYY, h:mm');
        finished[1].date = moment(finished[1].date).format('MMMM Do YYYY, h:mm');
    }

    var doubleElimination;
    var status = 1;
    if (statusTournament.length != 0){
        status = statusTournament[0].Status;
    }

    if (data.length != 0) {
        var listPlayer;
        if (res.locals.isAuthenticated && status == 0 && editable == 1){ // list for admin have id to edit when tournament start
            listPlayer = [    
                [{name: data[0].name1, ID: data[0].ID1}, {name: data[0].name2, ID: data[0].ID2}],
                [{name: data[1].name1, ID: data[1].ID1}, {name: data[1].name2, ID: data[1].ID2}],
                [{name: data[2].name1, ID: data[2].ID1}, {name: data[2].name2, ID: data[2].ID2}],
                [{name: data[3].name1, ID: data[3].ID1}, {name: data[3].name2, ID: data[3].ID2}],
                [{name: data[4].name1, ID: data[4].ID1}, {name: data[4].name2, ID: data[4].ID2}],
                [{name: data[5].name1, ID: data[5].ID1}, {name: data[5].name2, ID: data[5].ID2}],
                [{name: data[6].name1, ID: data[6].ID1}, {name: data[6].name2, ID: data[6].ID2}],
                [{name: data[7].name1, ID: data[7].ID1}, {name: data[7].name2, ID: data[7].ID2}],
            ]
        }
        else{
            listPlayer = [  
                [data[0].name1, data[0].name2],
                [data[1].name1, data[1].name2],
                [data[2].name1, data[2].name2],
                [data[3].name1, data[3].name2],
                [data[4].name1, data[4].name2],
                [data[5].name1, data[5].name2],
                [data[6].name1, data[6].name2],
                [data[7].name1, data[7].name2],
            ]
        }
        doubleElimination = {
            teams: listPlayer,    // Danh sách tuyển thủ theo thứ tự thi đấu
            results: [[ /* WINNER BRACKET */
                // 8 team
                /*[[3, 5], [2, 4], [6, 3], [2, 3]],
                [[1, 2], [3, 4]],
                [[null, null]],*/
        
                // 16 team
                [[data[0].s1, data[0].s2, {date: data[0].date, idTour: idTournament, branch: data[0].branch, idMatch: data[0].idMatch}], 
                [data[1].s1, data[1].s2, {date: data[1].date, idTour: idTournament, branch: data[1].branch, idMatch: data[1].idMatch}], 
                [data[2].s1, data[2].s2, {date: data[2].date, idTour: idTournament, branch: data[2].branch, idMatch: data[2].idMatch}], 
                [data[3].s1, data[3].s2, {date: data[3].date, idTour: idTournament, branch: data[3].branch, idMatch: data[3].idMatch}],
                [data[4].s1, data[4].s2, {date: data[4].date, idTour: idTournament, branch: data[4].branch, idMatch: data[4].idMatch}], 
                [data[5].s1, data[5].s2, {date: data[5].date, idTour: idTournament, branch: data[5].branch, idMatch: data[5].idMatch}], 
                [data[6].s1, data[6].s2, {date: data[6].date, idTour: idTournament, branch: data[6].branch, idMatch: data[6].idMatch}], 
                [data[7].s1, data[7].s2, {date: data[7].date, idTour: idTournament, branch: data[7].branch, idMatch: data[7].idMatch}]],
                [[data[8].s1, data[8].s2, {date: data[8].date, idTour: idTournament, branch: data[8].branch, idMatch: data[8].idMatch}],
                [data[9].s1, data[9].s2, {date: data[9].date, idTour: idTournament, branch: data[9].branch, idMatch: data[9].idMatch}], 
                [data[10].s1, data[10].s2, {date: data[10].date, idTour: idTournament, branch: data[10].branch, idMatch: data[10].idMatch}],
                [data[11].s1, data[11].s2, {date: data[11].date, idTour: idTournament, branch: data[11].branch, idMatch: data[11].idMatch}]],
                [[data[12].s1, data[12].s2, {date: data[12].date, idTour: idTournament, branch: data[12].branch, idMatch: data[12].idMatch}], 
                [data[13].s1, data[13].s2, {date: data[13].date, idTour: idTournament, branch: data[13].branch, idMatch: data[13].idMatch}]],
                [[data[14].s1, data[14].s2, {date: data[14].date, idTour: idTournament, branch: data[14].branch, idMatch: data[14].idMatch}]]
            ], [         /* LOSER BRACKET */
                // 8 team
                /*[[5, 1], [1, 2]],
                [[8, 2], [1, 2]],
                [[null, null]],
                [[null, null]],
                [[null, null]]*/
            
                // 16 team
                [[data[15].s1, data[15].s2, {date: data[15].date, idTour: idTournament, branch: data[15].branch, idMatch: data[15].idMatch}],
                [data[16].s1, data[16].s2, {date: data[16].date, idTour: idTournament, branch: data[16].branch, idMatch: data[16].idMatch}], 
                [data[17].s1, data[17].s2, {date: data[17].date, idTour: idTournament, branch: data[17].branch, idMatch: data[17].idMatch}], 
                [data[18].s1, data[18].s2, {date: data[18].date, idTour: idTournament, branch: data[18].branch, idMatch: data[18].idMatch}]],
                [[data[19].s1, data[19].s2, {date: data[19].date, idTour: idTournament, branch: data[19].branch, idMatch: data[19].idMatch}], 
                [data[20].s1, data[20].s2, {date: data[20].date, idTour: idTournament, branch: data[20].branch, idMatch: data[20].idMatch}],
                [data[21].s1, data[21].s2, {date: data[21].date, idTour: idTournament, branch: data[21].branch, idMatch: data[21].idMatch}], 
                [data[22].s1, data[22].s2, {date: data[22].date, idTour: idTournament, branch: data[22].branch, idMatch: data[22].idMatch}]],
                [[data[23].s1, data[23].s2, {date: data[23].date, idTour: idTournament, branch: data[23].branch, idMatch: data[23].idMatch}],
                [data[24].s1, data[24].s2, {date: data[24].date, idTour: idTournament, branch: data[24].branch, idMatch: data[24].idMatch}]],
                [[data[25].s1, data[25].s2, {date: data[25].date, idTour: idTournament, branch: data[25].branch, idMatch: data[25].idMatch}], 
                [data[26].s1, data[26].s2, {date: data[26].date, idTour: idTournament, branch: data[26].branch, idMatch: data[26].idMatch}]],
                [[data[27].s1, data[27].s2, {date: data[27].date, idTour: idTournament, branch: data[27].branch, idMatch: data[27].idMatch}]],
                [[data[28].s1, data[28].s2, {date: data[28].date, idTour: idTournament, branch: data[28].branch, idMatch: data[28].idMatch}]]

            ], [         /* FINALS */
                [[data[29].s1, data[29].s2, {date: data[29].date, idTour: idTournament, branch: data[29].branch, idMatch: data[29].idMatch}],
                [data[30].s1, data[30].s2, {date: data[30].date, idTour: idTournament, branch: data[30].branch, idMatch: data[30].idMatch}]],
                //[[2, 1]]
            ]]
        }
    }
    const num = await adminModel.allPlayerByTournament(idTournament);
    const Tournament = await adminModel.detailTournament(idTournament);
    console.log('where2');
    console.log(editable);
    res.render('home',{
        title: 'Home Page',
        style: ['home.css', 'popup.css'],
        js: ['home.js'],
        bracketFormat: JSON.stringify(doubleElimination),
        tournament: Tournament[0],
        upcoming,
        finished,
        num: num.length,
        status,
        editable,
    })
    console.log(doubleElimination);
});
router.post('/',async (req,res)=>{
    const data = req.body;
    const idTournament = res.locals.current;

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
            if (player1 != null) player1 = player1.ID;
            if (player2 != null) player2 = player2.ID;
        
            winnerBracket.push({
                match_roundMatch: count,
                match_branch: 0,
                player_idPlayer1: player1,
                player_idPlayer2: player2,
                score1: s1,
                score2: s2,
                match_tournament_idTournament: idTournament
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
            if (player1 != null) player1 = player1.ID;
            if (player2 != null) player2 = player2.ID;
        
            loserBracket.push({
                match_roundMatch: count,
                match_branch: 1,
                player_idPlayer1: player1,
                player_idPlayer2: player2,
                score1: s1,
                score2: s2,
                match_tournament_idTournament: idTournament
            })
            count++;
        }
    }
    
    listFinal = listFinal.concat(listWin);

    //final
    const finalBracket = [];

    round = data.results[2][0];
    // get data last 2 match

    player1 = listFinal[0];
    player2 = listFinal[1];

    if (player1 != null) player1 = player1.ID;
    if (player2 != null) player2 = player2.ID;

    finalBracket.push({
        match_roundMatch: 1,
        match_branch: 2,
        player_idPlayer1: player1,
        player_idPlayer2: player2,
        score1: round[0][0],
        score2: round[0][1],
        match_tournament_idTournament: idTournament
    })


    player1 = listLose[listLose.length - 2];
    player2 = listLose[listLose.length - 1];

    if (player1 != null) player1 = player1.ID;
    if (player2 != null) player2 = player2.ID;

    finalBracket.push({
        match_roundMatch: 2,
        match_branch: 2,
        player_idPlayer1: player1,
        player_idPlayer2: player2,
        score1: round[1][0],
        score2:  round[1][1],
        match_tournament_idTournament: idTournament
    })

    // update status
    var player = {
        statusPlayer: 0,
        idPlayer: 1
    }
    for (i = 0; i < 15; i++) {
        const result = await adminModel.patchBracket(winnerBracket[i]);
        player.statusPlayer = 0;
        // change status of both to winnerbranch in case of draw or score = 0
        player.idPlayer = winnerBracket[i].player_idPlayer1;
        await adminModel.modifyPlayer(player);
        player.idPlayer = winnerBracket[i].player_idPlayer2;
        await adminModel.modifyPlayer(player);

        // change status of loser to loser branch 
        if (winnerBracket[i].score1 != null && winnerBracket[i].score2 != null && winnerBracket[i].score1 > winnerBracket[i].score2){
            player.idPlayer = winnerBracket[i].player_idPlayer2;
            player.statusPlayer = 1;
            await adminModel.modifyPlayer(player);
        }
        else 
        if (winnerBracket[i].score1 != null && winnerBracket[i].score2 != null &&winnerBracket[i].score1 < winnerBracket[i].score2){
            player.idPlayer = winnerBracket[i].player_idPlayer1;
            player.statusPlayer = 1;
            await adminModel.modifyPlayer(player);
        }
    }
    for (i = 0; i < 14; i++) {
        const result = await adminModel.patchBracket(loserBracket[i]);

        // change status of both to loser branch in case of draw or score = 0
        player.statusPlayer = 1;
        player.idPlayer = loserBracket[i].player_idPlayer1;
        await adminModel.modifyPlayer(player);
        player.idPlayer = loserBracket[i].player_idPlayer2;
        await adminModel.modifyPlayer(player);

        // change status of loser to out branch 
        if (loserBracket[i].score1 != null && loserBracket[i].score2 != null && loserBracket[i].score1 > loserBracket[i].score2){
            player.idPlayer = loserBracket[i].player_idPlayer2;
            player.statusPlayer = 2;
            await adminModel.modifyPlayer(player);
        }
        else 
        if (loserBracket[i].score1 != null && loserBracket[i].score2 != null && loserBracket[i].score1 < loserBracket[i].score2){
            player.idPlayer = loserBracket[i].player_idPlayer1;
            player.statusPlayer = 2;
            await adminModel.modifyPlayer(player);
        }
    }
    for (i = 0; i < 2; i++) {
        const result = await adminModel.patchBracket(finalBracket[i]);

        // change status of both to final branch
        player.statusPlayer = 3;
        player.idPlayer = finalBracket[i].player_idPlayer1;
        await adminModel.modifyPlayer(player);
        player.idPlayer = finalBracket[i].player_idPlayer2;
        await adminModel.modifyPlayer(player);
    }
})

router.get('/login', GuestOnly, (req, res) => {
    res.render('login', {
        title: 'Đăng nhập',
        style: ['login.css'],
        js: ['login.js'],
    });
});
  
router.post('/login', async (req, res) => {
    const user = await adminModel.getIdByUsername(req.body.username);
    if (user.length == 0) {
      return res.render("login", {
        title: "Đăng nhập",
        style: ["login.css"],
        js: ["login.js"],
        err_message: 'Tài khoản không tồn tại'
      });
    }
    const rs = bcrypt.compareSync(req.body.f_password, user[0].password);
    if (rs === false) {
      return res.render("login", {
        title: "Đăng nhập",
        style: ["login.css"],
        js: ["login.js"],
        err_message: 'Sai mật khẩu'
      });
    }
  
    delete user[0].password;
    req.session.isAuthenticated = true;
    req.session.authUser = user[0];
  
    const url = req.query.retUrl || '/';
    res.redirect(url);
})
  
router.get('/logout', UserOnly,(req, res) => {
    req.session.isAuthenticated = false;
    req.session.authUser = null;
    res.locals.isAuthenticated = false;
    res.locals.authUser = null;
    res.redirect("/");
});

router.get('/register', (req, res) => {
    res.render('signup', {
        title: 'Đăng kí',
        style: ['login.css'],
        errors: req.session.errors,
        saveForm: req.session.saveForm
    });
    req.session.errors = null;
    req.session.saveForm = null;
});

router.post('/register', [
    check('username', "Tên tài khoản không hợp lệ")
        .not().isEmpty()
        .trim()
        .isLength({ min: 6 }).withMessage("Tên tài khoản phải có ít nhất 6 ký tự")
        .custom(async value => {
          return id = await adminModel.getIdByUsername(value).then(result => {
            if (result.length > 0) {
              return Promise.reject('Tên tài khoản đã tồn tại');
            }
          })
        }),
    check('email', "Email không hợp lệ")
        .isEmail()
        .normalizeEmail()
        .custom(async value => {
          return id = await adminModel.getIdByEmail(value).then(result => {
            if (result.length > 0) {
              return Promise.reject('E-mail đã tồn tại');
            }
          })
        }),
    check('f_password')
        .not().isEmpty()
        .isLength({ min: 6 }).withMessage("Mật khẩu phải có ít nhất 6 ký tự")
        .custom((val, { req }) => {
          if (val !== req.body.f_rpassword) {
              throw new Error("Mật khẩu nhập lại không đúng");
          } else {
              return val;
          }
        }),
],async (req, res) => {
    var errors = validationResult(req).array();
    if (errors.length > 0) {
      req.session.errors = errors;
      req.session.saveForm = req.body;
      res.redirect('/register');
    } else {  
      const N = 10;
      const hash = bcrypt.hashSync(req.body.f_password, N);
  
      const entity = req.body;
      entity.password = hash;
  
      delete entity.f_password;
      delete entity.f_rpassword;
  
      const result = await adminModel.addUser(entity);
      res.redirect('/');
    }
});

router.get('/about', async (req,res)=>{
    const tournament = await adminModel.detailTournament(res.locals.current);
    res.render('about',{
        title: 'About Page',
        style: ['about.css'],
        js: ['home.js'],
        tournament
    })
})

router.get('/match/:idTournament/:branch/:idMatch', async (req,res)=>{
    const round = req.params.idMatch;
    const branch = req.params.branch;
    const id = req.params.idTournament;
    const match = await adminModel.getMatch(round, branch, id);
    res.render('match',{
        title: 'Match',
        style: ['match.css'],
        js: ['home.js'],
        match,
        round,
        branch,
        id
    })
})

router.get('/match/:idTournament/:branch/:idMatch/modify', UserOnly, async (req,res)=>{
    const round = req.params.idMatch;
    const branch = req.params.branch;
    const id = req.params.idTournament;
    const match = await adminModel.getMatch(round, branch, id);
    console.log(match);
    res.render('modifyMatch',{
        title: 'Modify match',
        style: ['match.css'],
        js: ['home.js'],
        match,
        round,
        branch,
        id
    })
})
router.post('/match/:idTournament/:branch/:idMatch/modify', async (req,res)=>{

    const detailMatch = {
        time: req.body.time,
        kill1: req.body.kill1,
        kill2: req.body.kill2,
        died1: req.body.died1,
        died2: req.body.died2,
        match_roundMatch: req.params.idMatch,
        match_branch: req.params.branch,
        match_tournament_idTournament: req.params.idTournament,
    };
    await adminModel.modifyDetailMatch(detailMatch);

    const match = {
        dateMatch: moment(req.body.dob, 'DD/MM/YYYY').format('YYYY-MM-DD'),
        roundMatch: req.params.idMatch,
        branch: req.params.branch,
        tournament_idTournament: req.params.idTournament,
    };
    await adminModel.modifyMatch(match);

    res.redirect(`/match/${req.params.idTournament}/${req.params.branch}/${req.params.idMatch}`)
})


router.post('/current',(req,res)=>{
    req.session.current = req.body.current;
    res.redirect('back');
})

router.use('/listTournament', express.static('public'));

router.get('/listTournament',async(req,res)=>{
    const tournament = await adminModel.allTournament();
    console.log(tournament);

    for(i=0;i < tournament.length ;i++){
        tournament[i].dateStart = moment(tournament[i].dateStart,'YYYY-MM-DD').format('LL');
        tournament[i].dateEnd = moment(tournament[i].dateEnd,'YYYY-MM-DD').format('LL');
    }

    console.log(tournament);
    res.render('listTournament',{
        tournament,
        title: 'Tournament',
        style: ['listPlayer.css'],
        js: ['home.js']
    })
})

router.use('/tournament/:idTournament', express.static('public'));

router.get('/tournament/:idTournament',async(req,res)=>{
    const tournament = await adminModel.detailTournament(req.params.idTournament);
    console.log(tournament);

    for(i=0;i < tournament.length ;i++){
        tournament[i].dateStart = moment(tournament[i].dateStart,'YYYY-MM-DD').format('YYYY/MM/DD');
        tournament[i].dateEnd = moment(tournament[i].dateEnd,'YYYY-MM-DD').format('YYYY/MM/DD');
    }

    res.render('tournamentDetail',{
        tournament: tournament[0],
        title: 'Tournament',
        style: ['style.css'],
        js:['home.js']
    })
})

router.get('/overview',async(req,res)=>{
    console.log(res.locals.current);
    const rows = await adminModel.getOverview(res.locals.current);
    console.log(rows);
    res.render('overview',{
        overviews: rows[0],
        title: 'Over View',
        style: ['style.css'],
    })
})

router.post('/startTournament/:random', async (req,res)=>{
    const idTournament = req.body.id;
    const random = req.params.random;

    const listPlayers = await adminModel.allPlayerIDByTournament(idTournament);

    function shuffleFisherYates(array) {
        let i = array.length;
        while (i--) {
          const ri = Math.floor(Math.random() * (i + 1));
          [array[i], array[ri]] = [array[ri], array[i]];
        }
        return array;
    }
    
    var list = listPlayers;
    if (random == 1){ // random
        list = shuffleFisherYates(listPlayers);
    }
    
    for(i = 0; i < list.length/2; i++){
        const entity = {
            match_roundMatch: i + 1,
            player_idPlayer1: list[i*2].id,
            player_idPlayer2: list[i*2+1].id,
            match_tournament_idTournament: idTournament 
        }
        await adminModel.addPlayerBracket(entity);
    }
    await adminModel.updateStatusTournament(req.body.id);
    res.redirect('/');
})
module.exports = router;