const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3');
const path = require('path')

require('dotenv').config();

// routers
const user_router = require('./routes/user-router.js');

const app = express();
const port = process.env.PORT || 3005;

// DATABASE
let db = require("./db/database.js");

app.use(cors());
app.use(express.json());

app.get('/', function(req, res) {
    res.send('Hello World')
});

app.use('/api/users', user_router);

app.listen(port, () =>{
    console.log('app running on port: ' + port);
});