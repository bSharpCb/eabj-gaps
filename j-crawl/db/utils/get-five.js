import mysql2 from 'mysql2';
import creds from '../credentials.js';
import fs from 'fs';
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
    const get_five = "SELECT * FROM clues ORDER BY RAND() LIMIT 5";
    con.query(get_five, function (err,result) {
        if (err) throw err;
        console.log(result);
        console.log(typeof(result));
        const results_path = '../j-app/public/lib/clues.json';
        fs.writeFile(results_path, JSON.stringify(result), function (err) {
            if (err) throw err;
            console.log(`Results saved at ${results_path}. \n Categories: ${result.length} \n Total clues: ${result.length * 5}`);
          });
        return result;
    });
});

//write matched clue categories to results.json


return query;
})();

export default questions;