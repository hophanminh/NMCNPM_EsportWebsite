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
  
  patchBracket: async (entity)=>{ 
    var query =`update player_has_match
                set player_idPlayer1 = ?, player_idPlayer2 = ?, score1 = ?, score2 = ? 
                where match_roundMatch = ? and match_branch = ? and match_tournament_idTournament = ?`;
    return await db.loadA(query, [entity.player_idPlayer1, entity.player_idPlayer2, entity.score1, entity.score2, entity.match_roundMatch, entity.match_branch, entity.match_tournament_idTournament]);
  },

  getBracketData: id =>
        db.load(`SELECT PhM.match_roundMatch as idMatch, P1.idPlayer as ID1, P1.usernamePlayer as name1, P2.idPlayer as ID2, P2.usernamePlayer as name2, PhM.score1 as s1, PhM.score2 as s2
                FROM esport.player_has_match PhM LEFT JOIN  esport.player P1 ON PhM.player_idPlayer1 = P1.idPlayer
                                                 LEFT JOIN  esport.player P2 ON PhM.player_idPlayer2 = P2.idPlayer
                WHERE match_tournament_idTournament = ${id}
                ORDER BY match_branch, match_roundMatch
                LIMIT 31`),

  allPlayer: ()=> db.load(`select player.*, tournament.nameTournament 
                          from player left join tournament on player.tournament_idTournament = tournament.idTournament`),
  allPlayerByTournament: id => db.loadSafe(`select player.*, tournament.nameTournament 
                                          from player left join tournament on player.tournament_idTournament = tournament.idTournament
                                          where player.tournament_idTournament = ?`, id),
  detailPlayer: (id)=> db.load(`select * from player where idPlayer=${id}`),
  modifyPlayer: (entity) =>{
    const condition = {idPlayer: entity.idPlayer};
    delete entity.idPlayer;
    return db.modify('player',entity,condition);
  },
  deletePlayer: (id) => db.del('player',{idPlayer: id}),

  allTournament: ()=> db.load(`select * from tournament`),
  detailTournament: (id)=> db.load(`select * from tournament where idTournament=${id}`),
  modifyTournament: (entity) =>{
    const condition = {idTournament: entity.idTournament};
    delete entity.idTournament;
    return db.modify('tournament',entity,condition);
  },
  deleteTournament: (id) => db.del('tournament',{idTournament: id}),
  addPlayer: entity => db.add('player',entity),


  getIdByUsername: username => db.loadSafe(`SELECT * FROM esport.account WHERE username = ?`, username),
  getIdByEmail: email => db.loadSafe(`SELECT * FROM esport.account WHERE email = ?`, email),

  addUser: entity => db.add('esport.account', entity),

  getCurrentTournament: () => db.load(`SELECT MAX(idTournament) as max FROM esport.tournament`),
  getIDAllTournament: ()=> db.load(`select idTournament, nameTournament from tournament order by idTournament desc`),
  addMatch: entity => db.add('esport.match', entity),

  addPlayer_Match: entity => db.add('esport.player_has_match', entity),
  addOverview: entity => db.add('overview',entity),
  singleTournament: id => db.load(`select * from tournament where idTournament = ${id}`),
}