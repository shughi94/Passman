const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3');
const path = require('path')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3005;

const dbPath = path.resolve(__dirname, './db/passman.db')

let db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error(err.message);
    }
    else {
        console.log('Connected to the database.');
    } 
});

app.use(cors());
app.use(express.json());

app.get('/', function(req, res) {
    res.send('Hello World')
});

app.listen(port, () =>{
    console.log('app running on port: ' + port);
});