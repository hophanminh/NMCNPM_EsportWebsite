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

router.get('/', async (req,res)=>{
    const idTournament = await adminModel.getCurrentTournament();

    const data = await adminModel.getBracketData(idTournament[0].max);
    var listPlayer;
    if (res.locals.isAuthenticated){ // list for admin have id to edit
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
    var doubleElimination = {
        teams: listPlayer,    // Danh sách tuyển thủ theo thứ tự thi đấu
        results: [[ /* WINNER BRACKET */
            // 8 team
            /*[[3, 5], [2, 4], [6, 3], [2, 3]],
            [[1, 2], [3, 4]],
            [[null, null]],*/
    
            // 16 team
            [[data[0].s1, data[0].s2], [data[1].s1, data[1].s2], [data[2].s1, data[2].s2], [data[3].s1, data[3].s2],
             [data[4].s1, data[4].s2], [data[5].s1, data[5].s2], [data[6].s1, data[6].s2], [data[7].s1, data[7].s2]],
            [[data[8].s1, data[8].s2], [data[9].s1, data[9].s2], [data[10].s1, data[10].s2],[data[11].s1, data[11].s2]],
            [[data[12].s1, data[12].s2], [data[13].s1, data[13].s2]],
            [[data[14].s1, data[14].s2]]
        ], [         /* LOSER BRACKET */
            // 8 team
            /*[[5, 1], [1, 2]],
            [[8, 2], [1, 2]],
            [[null, null]],
            [[null, null]],
            [[null, null]]*/
        
            // 16 team
            [[data[15].s1, data[15].s2], [data[16].s1, data[16].s2], [data[17].s1, data[17].s2], [data[18].s1, data[18].s2]],
            [[data[19].s1, data[19].s2], [data[20].s1, data[20].s2], [data[21].s1, data[21].s2], [data[22].s1, data[22].s2]],
            [[data[23].s1, data[23].s2], [data[24].s1, data[24].s2]],
            [[data[25].s1, data[25].s2], [data[26].s1, data[26].s2]],
            [[data[27].s1, data[27].s2]],
            [[data[28].s1, data[28].s2]]

        ], [         /* FINALS */
            [[data[29].s1, data[29].s2], [data[30].s1, data[30].s2]],
            //[[2, 1]]
        ]]
    }
    
    const Tournament = await adminModel.detailTournament(idTournament[0].max);
    console.log(Tournament[0]);
    res.render('home',{
        title: 'Home Page',
        style: ['home.css'],
        js: ['home.js'],
        bracketFormat: JSON.stringify(doubleElimination),
        tournament: Tournament[0]
    })
    console.log("login: " + res.locals.isAuthenticated);
});
router.post('/',async (req,res)=>{
    const data = req.body;
    const idTournament = await adminModel.getCurrentTournament();

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
                match_tournament_idTournament: idTournament[0].max
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
                match_tournament_idTournament: idTournament[0].max
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
        match_tournament_idTournament: idTournament[0].max
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
        match_tournament_idTournament: idTournament[0].max
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

router.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Page',
        style: ['about.css'],
        js: ['home.js']
    })
})
router.get('/match',(req,res)=>{
    res.render('match',{
        title: 'Match',
        style: ['match.css'],
        js: ['home.js']
    })
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

router.get('/overview',(req,res)=>{
    res.render('overview',{
        title: 'Over View',
        style: ['style.css'],
    })
})



module.exports = router;