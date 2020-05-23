const express = require('express');
const router = express.Router();

let db = require("../../db/database.js");

/*
    /credentials
*/

router.get("/", (req, res, next) => {
    let user_id = req.user_id;
    
    var sql = "select * from credential where user_id='"+user_id+"'";
    var params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"Welcome!",
            "credentials":rows
        })
    });
});

module.exports = router;