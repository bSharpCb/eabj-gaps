import mysql2 from 'mysql2';
import creds from './credentials.js';



const con = mysql2.createConnection({
      host: creds.host,
      user: creds.user,
      password: creds.password,
      database: creds.database
});

export default con;