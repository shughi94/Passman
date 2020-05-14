const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

let db = require("./../db/database.js");

/*
    /login
*/

router.post("/", (req, res, next) => {

    let username = req.body.username;
    let password = req.body.password;

    let secret = process.env.JWT_SECRET_KEY;

    var sql = "select * from user where username='"+username+"'";
    var params = [];

    db.all(sql, params,function(err, rows) {
        if (err) {
            res.status(400).json({
                "error":err.message
            });
            return;
        }
        bcrypt.compare(password, rows[0].password, function(err, same) {
            if (err) {
                res.json({
                    "message":"NOPE",
                    "data":err
                });
            }
            if(same){
                // Issue token
                const payload = { "id":rows[0].id };
                const token = jwt.sign(payload, secret, {
                    expiresIn: '1h'
                });
                res.cookie('token', token, { httpOnly: true })
                    .sendStatus(200);
                }
            else{
                res.json({
                    "message":"Wrong credential",
                    "data":"NOPE"
                });
            }
        })
    })
});

module.exports = router;