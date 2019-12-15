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
  
  patchBracket:(entity)=>{ 
    var query =`update player_has_match
                set player_idPlayer1 = ?, player_idPlayer2 = ?, score1 = ?, score2 = ? 
                where match_roundMatch = ? and match_branch = ?`;
    return db.loadA(query, [entity.player_idPlayer1, entity.player_idPlayer2, entity.score1, entity.score2, entity.match_roundMatch, entity.match_branch]);
  },


}

