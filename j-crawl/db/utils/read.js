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
    const makeTable = 'CREATE TABLE clues (cat_id VARCHAR(255), category VARCHAR(1275), c1 VARCHAR(1275), a1 VARCHAR(255), c2 VARCHAR(1275), a2 VARCHAR(255), c3 VARCHAR(1275), a3 VARCHAR(255), c4 VARCHAR(1275), a4 VARCHAR(255), c5 VARCHAR(1275), a5 VARCHAR(255), comments VARCHAR(255))';
    const delTable = "DROP TABLE clues";
    const get_clues_jep = "SELECT * FROM clues ORDER BY RAND() LIMIT 5";
    //con.query(delTable, function (err,result) {
    //con.query(makeTable, function (err,result) {
    //con.query(get_clues_jep, function (err,result) {
    //con.query(get_clues_jep, function (err,result) {
    con.query(seeAll, function (err,result) {
        if (err) throw err;
        console.log(result);
        return result;
    });
});
return query;
})();

export default questions;