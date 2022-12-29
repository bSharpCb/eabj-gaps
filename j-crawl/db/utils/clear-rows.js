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
    const delAll = "DELETE FROM clues WHERE category != 'blahblahs'";
    con.query(delAll, function (err,result) {
        if (err) throw err;
        console.log(result);
        return result;
    });
});
return query;
})();

export default questions;