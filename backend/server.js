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

app.get("/api/users", (req, res, next) => {
    var sql = "select * from user";
    var params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

app.listen(port, () =>{
    console.log('app running on port: ' + port);
});