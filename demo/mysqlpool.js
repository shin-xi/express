const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'shino',
    password: 'helpme',
    database: 'yiibaidb'
});

pool.query('SELECT lastname, firstname, jobtitle FROM employees;', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
});


// pool.getConnection(function(err, connection) {
//     if (err) throw err; // not connected!
//
//     // Use the connection
//     connection.query('SELECT lastname, firstname, jobtitle FROM employees;', function (error, results, fields) {
//         // When done with the connection, release it.
//         connection.release();
//         console.log('The solution is: ', results);
//         // Handle error after the release.
//         if (error) throw error;
//
//         // Don't use the connection here, it has been returned to the pool.
//     });
// });


