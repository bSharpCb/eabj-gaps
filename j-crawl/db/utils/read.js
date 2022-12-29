import mysql2 from 'mysql2';
import creds from '../credentials.js';
const questions = (async () => {


const con = mysql2.createConnection({
      host: creds.host,
      user: creds.user,
      password: creds.password,
      database: creds.database
});

con.connect(function (err) {
    if (err) throw err;
    console.log(`connected!`)
})


const query = await con.connect(function (err) {
    if (err) throw err;
    console.log(`connected!`)
    const seeAll = "SELECT * FROM clues";
    const delAll = "DELETE FROM clues WHERE category != 'blahblahs'";
    const makeTable = 'CREATE TABLE clues (category VARCHAR(255), c1 VARCHAR(2550), a1 VARCHAR(255), c2 VARCHAR(2550), a2 VARCHAR(255), c3 VARCHAR(2550), a3 VARCHAR(255), c4 VARCHAR(2550), a4 VARCHAR(255), c5 VARCHAR(2550), a5 VARCHAR(255), comments VARCHAR(255))';
    const delTable = "DROP TABLE clues";
    const get_clues_jep = "SELECT * FROM clues ORDER BY RAND() LIMIT 5";
    con.query(seeAll, function (err,result) {
        if (err) throw err;
        console.log(result);
        return result;
    });
});
return query;
})();

export default questions;