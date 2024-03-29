const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');

require('dotenv').config();

// routers
const general_router = require('./routes/general-router.js');
const login_router = require('./routes/login-router.js');
const logout_router = require('./routes/logout-router.js');

// middlewares
const withAuth = require('./authMiddleware');

const app = express();
const port = process.env.PORT || 3005;

// DATABASE
let db = require("./db/database.js");

app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use('/login', login_router);
app.use('/logout', logout_router);
app.get('/checkToken', withAuth, function(req, res) {
    res.sendStatus(200);
});

app.use('/', withAuth, general_router);

app.listen(port, () =>{
    console.log('app running on port: ' + port);
});