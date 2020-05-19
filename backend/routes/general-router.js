const express = require('express');
const router = express.Router();

/*
    /api
*/

// module routers
const user_router = require('./user/user-router.js');

router.get("/users", user_router);

router.get("/home", (req, res, next) => {
    res.send("PASSMAN APP");
})

module.exports = router;