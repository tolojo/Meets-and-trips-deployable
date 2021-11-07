var express = require('express');
var router = express.Router();
var mUtil = require("../models/meetingModel");


router.get("/", async function (req, res, next) {
    let result = await mUtil.getAllConcents();
    res.status(result.status).send(result.result);
});

router.get("/:id", async function (req, res, next) {
    let id = req.params.id;
    let result = await mUtil.getConcentByID(id);
    res.status(result.status).send(result.result);
});
 router.post("/", async function (req, res, next){
    let newMeet = req.body;
    let result = await mUtil.saveConcent(newMeet);
    res.status(result.status).send(result.result);
 })


module.exports = router;
