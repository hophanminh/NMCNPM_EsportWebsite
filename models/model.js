const db = require('../utils/db');

module.exports = {
  /*all: () => db.load('select * from categories'),
  single: id => db.load(`select * from categories where CatID = ${id}`),
  add: entity => db.add('categories', entity),
  del: id => db.del('categories', { CatID: id }),
  patch: entity => {
    const condition = { CatID: entity.CatID };
    delete entity.CatID;
    return db.patch('categories', entity, condition);
  },*/

  add: (entity)=> db.add('tournament',entity),
  
  // bracket
  addPlayerBracket: async entity =>{ 
    var query =`update player_has_match
                set player_idPlayer1 = ?, player_idPlayer2 = ?, score1 = ?, score2 = ? 
                where match_roundMatch = ? and match_branch = 0 and match_tournament_idTournament = ?`;
    return await db.loadSafe(query, [entity.player_idPlayer1, entity.player_idPlayer2, null, null, entity.match_roundMatch, entity.match_tournament_idTournament]);
  },

  patchBracket: async (entity)=>{ 
    var query =`update player_has_match
                set player_idPlayer1 = ?, player_idPlayer2 = ?, score1 = ?, score2 = ? 
                where match_roundMatch = ? and match_branch = ? and match_tournament_idTournament = ?`;
    return await db.loadSafe(query, [entity.player_idPlayer1, entity.player_idPlayer2, entity.score1, entity.score2, entity.match_roundMatch, entity.match_branch, entity.match_tournament_idTournament]);
  },
  getBracketData: id =>
        db.loadSafe(` SELECT PhM.match_roundMatch as idMatch, PhM.match_branch as branch, M.dateMatch as date, P1.idPlayer as ID1, P1.usernamePlayer as name1, P2.idPlayer as ID2, P2.usernamePlayer as name2, PhM.score1 as s1, PhM.score2 as s2 
                      FROM esport.match M LEFT JOIN esport.player_has_match PhM ON M.roundMatch = PhM.match_roundMatch AND
                                                                                   M.branch = PhM.match_branch AND
                                                                                   M.tournament_idTournament = PhM.match_tournament_idTournament
                                          LEFT JOIN esport.player P1 ON PhM.player_idPlayer1 = P1.idPlayer
                                          LEFT JOIN esport.player P2 ON PhM.player_idPlayer2 = P2.idPlayer
                      WHERE match_tournament_idTournament = ?
                      ORDER BY M.branch, M.roundMatch
                      LIMIT 31`, id),
  getUpcomingMatch: id =>
        db.loadSafe(` SELECT M.dateMatch as date, P1.idPlayer as ID1, P1.usernamePlayer as name1, P2.idPlayer as ID2, P2.usernamePlayer as name2, PhM.score1 as s1, PhM.score2 as s2 
                      FROM esport.match M LEFT JOIN esport.player_has_match PhM ON M.roundMatch = PhM.match_roundMatch AND
                                                                                   M.branch = PhM.match_branch AND
                                                                                   M.tournament_idTournament = PhM.match_tournament_idTournament
                                          LEFT JOIN esport.player P1 ON PhM.player_idPlayer1 = P1.idPlayer
                                          LEFT JOIN esport.player P2 ON PhM.player_idPlayer2 = P2.idPlayer
                      WHERE match_tournament_idTournament = ? AND M.dateMatch > NOW()
                      ORDER BY M.dateMatch ASC
                      LIMIT 1`, id),
  getFinishedMatch: id =>
        db.loadSafe(` SELECT M.dateMatch, P1.idPlayer as ID1, P1.usernamePlayer as name1, P2.idPlayer as ID2, P2.usernamePlayer as name2, PhM.score1 as s1, PhM.score2 as s2 
                      FROM esport.match M LEFT JOIN esport.player_has_match PhM ON M.roundMatch = PhM.match_roundMatch AND
                                                                                   M.branch = PhM.match_branch AND
                                                                                   M.tournament_idTournament = PhM.match_tournament_idTournament
                                          LEFT JOIN esport.player P1 ON PhM.player_idPlayer1 = P1.idPlayer
                                          LEFT JOIN esport.player P2 ON PhM.player_idPlayer2 = P2.idPlayer
                      WHERE match_tournament_idTournament = ? AND M.dateMatch < NOW()
                      ORDER BY M.dateMatch DESC
                      LIMIT 2`, id),            
                    
  // player page
  allPlayer: ()=> db.load(`select player.*, tournament.nameTournament 
                          from player left join tournament on player.tournament_idTournament = tournament.idTournament`),
  allPlayerByTournament: id => db.loadSafe(`select player.*, tournament.nameTournament 
                                          from player left join tournament on player.tournament_idTournament = tournament.idTournament
                                          where player.tournament_idTournament = ?`, id),
  allPlayerIDByTournament: id => db.loadSafe(`select player.idPlayer as id
                                              from player left join tournament on player.tournament_idTournament = tournament.idTournament
                                              where player.tournament_idTournament = ?`, id),

  detailPlayer: (id)=> db.load(`select * from player where idPlayer=${id}`),
  modifyPlayer: (entity) =>{
    const condition = {idPlayer: entity.idPlayer};
    delete entity.idPlayer;
    return db.modify('player',entity,condition);
  },
  deletePlayer: (id) => db.del('player',{idPlayer: id}),

  // tournament page
  allTournament: ()=> db.load(`select * from tournament`),
  detailTournament: (id)=> db.load(`select * from tournament where idTournament=${id}`),
  modifyTournament: (entity) =>{
    const condition = {idTournament: entity.idTournament};
    delete entity.idTournament;
    return db.modify('tournament',entity,condition);
  },
  deleteTournament: (id) => db.del('tournament',{idTournament: id}),
  addPlayer: entity => db.add('player',entity),

  // login-register
  getIdByUsername: username => db.loadSafe(`SELECT * FROM esport.account WHERE username = ?`, username),
  getIdByEmail: email => db.loadSafe(`SELECT * FROM esport.account WHERE email = ?`, email),
  addUser: entity => db.add('esport.account', entity),

  
  getCurrentTournament: () => db.load(`SELECT MAX(idTournament) as max FROM esport.tournament`),
  getIDAllTournament: ()=> db.load(`select idTournament, nameTournament from tournament order by idTournament desc`),
  addMatch: entity => db.add('esport.match', entity),
  addDetailMatch: entity => db.add('esport.detailmatch', entity),

  addPlayer_Match: entity => db.add('esport.player_has_match', entity),

  addOverview: entity => db.add('overview',entity),
  singleTournament: id => db.load(`select * from tournament where idTournament = ${id}`),
  statusTournament: id => db.load(`select Status from tournament where idTournament = ${id}`),
  updateStatusTournament: id => db.loadSafe(`update tournament set Status = 0 where idTournament = ?`, id),

  getOverview: idTour => {
    const sql = `
    SELECT o.*, cham.usernamePlayer as PlayerChamUName, cham.realnamePlayer as PlayerChamRName, kil.usernamePlayer as PlayerKillUName, kil.realnamePlayer as PlayerKillRName
    FROM overview o
    join player cham on o.Champion = cham.idPlayer
    join player kil on o.mostkillPlayer = kil.idPlayer
    where o.tournament_idTournament = ${idTour}
    `
    return db.load(sql);
  },


}