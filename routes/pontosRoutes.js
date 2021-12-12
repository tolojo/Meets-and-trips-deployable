var express = require('express');
var router = express.Router();
var mPontos = require("../models/pontosModel");


router.get("/:id", async function (req, res, next) {
    let id = req.params.id;
    let result = await mPontos.getPontos(id);
    res.status(result.status).send(result.result);
});

module.exports = router;
