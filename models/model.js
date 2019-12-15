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
                where match_roundMatch = ? and match_branch = ?`;
    return await db.loadA(query, [entity.player_idPlayer1, entity.player_idPlayer2, entity.score1, entity.score2, entity.match_roundMatch, entity.match_branch]);
  },

  getBracketData: _ =>
        db.load(`SELECT PhM.match_roundMatch as idMatch, P1.idPlayer as ID1, P1.usernamePlayer as name1, P2.idPlayer as ID2, P2.usernamePlayer as name2, PhM.score1 as s1, PhM.score2 as s2
                FROM esport.player_has_match PhM LEFT JOIN  esport.player P1 ON PhM.player_idPlayer1 = P1.idPlayer
                                                 LEFT JOIN  esport.player P2 ON PhM.player_idPlayer2 = P2.idPlayer
                WHERE match_tournament_idTournament = 1
                ORDER BY match_branch, match_roundMatch
                LIMIT 31`),
}

