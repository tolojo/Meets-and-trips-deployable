var express = require('express');
var router = express.Router();
var mDisc = require("../models/discussionModel");


router.get("/", async function (req, res, next) {
    let result = await mDisc.getAllDiscussions();
    res.status(result.status).send(result.result);
});

module.exports=router;