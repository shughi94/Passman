const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config();

// routers
const user_router = require('./routes/user-router.js');
const login_router = require('./routes/login-router.js');

// middlewares
const withAuth = require('./authMiddleware');

const app = express();
const port = process.env.PORT || 3005;

// DATABASE
let db = require("./db/database.js");

app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.get('/', function(req, res) {
    res.send('Hello World')
});

app.use('/login', login_router);

app.use('/api/users', withAuth, user_router);

app.listen(port, () =>{
    console.log('app running on port: ' + port);
});