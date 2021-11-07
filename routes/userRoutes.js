var express = require('express');
var router = express.Router();
var mUtil = require("../models/userModel");

router.get("/", async function (req, res, next) {
    let utilizadores = await mUtil.getAllUsers();
    res.send(utilizadores);
});
module.exports = router;
