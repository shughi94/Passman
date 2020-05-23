const express = require('express');
const router = express.Router();

/*
    /
*/

// module routers
const user_router = require('./user/user-router.js');
const credential_router = require('./credential/credential-router.js');

router.get("/users", user_router);

router.use("/credentials", credential_router);

module.exports = router;