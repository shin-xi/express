const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'shino',
    password: 'helpme',
    database: 'yiibaidb',
    port: 3306,
    connectTimeout: 10000
});

// connection.connect();

connection.connect((err)=> {
    if (err) throw err;
    console.log('Connected to the MySQL server.');
});

// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results[0].solution);
// });


connection.query('SELECT lastname, firstname, jobtitle FROM employees;',  (error, results, fields)=> {
    if (error) throw error;
    console.log('The solution is: ', results);
    // console.log(fields);
});

// connection.end();

connection.end((err)=> {
    if (err) throw err;
    console.log('Close the database connection.');
});
