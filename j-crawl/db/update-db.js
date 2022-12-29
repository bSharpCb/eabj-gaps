import _games_db from '../get-clues.js';
import con from './db-connect.js';

const db = (async () => {
    const games = await _games_db;
    console.log(`Formatting ${games.length} games, please wait...`);
    
    con.connect(function (err) {
        if (err) throw err;
        console.log(`connected!`);
        const sql = 'INSERT INTO clues (category, c1, a1, c2, a2, c3, a3, c4, a4, c5, a5, comments) VALUES ?';
        const values = games;
        con.query(sql, [values], function (err,result) {
            if (err) throw err;
            console.log(`Number of records inserted ${result.affectedRows}`);
        });
    });
})();

export default db;