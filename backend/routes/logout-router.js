const express = require('express');
const router = express.Router();

/*
    /logout
*/

router.post("/", (req, res, next) => {
    
    res.cookie('token', '', { httpOnly: true })
    .sendStatus(200);
});

module.exports = router;