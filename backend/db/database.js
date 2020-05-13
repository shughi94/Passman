const sqlite3 = require('sqlite3');
const path = require('path')

const dbPath = path.resolve(__dirname, './passman.db')
let db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error(err.message);
    }
    else {
        console.log('Connected to the database.');
    } 
});

module.exports = db;