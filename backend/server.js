const express = require('express');
const cors = require('cors');

require('dotenv').config();

// routers
const user_router = require('./routes/user-router.js');
const login_router = require('./routes/login-router.js');

const app = express();
const port = process.env.PORT || 3005;

// DATABASE
let db = require("./db/database.js");

app.use(cors());
app.use(express.json());

app.get('/', function(req, res) {
    res.send('Hello World')
});

app.use('/login', login_router);

app.use('/api/users', user_router);

app.listen(port, () =>{
    console.log('app running on port: ' + port);
});