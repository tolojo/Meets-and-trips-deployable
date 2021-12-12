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

router.get("/:id/roadtrip", async function (req, res, next) {
   let id = req.params.id;
   let result = await mUtil.getRoadtripById(id);
   res.status(result.status).send(result.result);
});

router.post("/regConc", async function (req, res, next){
   let newMeet = req.body;
   let result = await mUtil.saveConcent(newMeet);
   res.status(result.status).send(result.result);
});


router.post("/regRoadtrip", async function (req, res, next) {
   let newMeet = req.body;
   let result = await mUtil.saveRoadtrip(newMeet);
   res.status(result.status).send(result.result);
});

router.put("/upConcent", async function (req, res, next) {
   let atlzMeet = req.body;
   let result = await mUtil.atualizarMeeting(atlzMeet);
   res.status(result.status).send(result.result);
});

module.exports = router;