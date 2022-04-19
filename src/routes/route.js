const express = require('express');
const router = express.Router();

const Controller= require("../controllers/controllers")
const commonMW = require ("../middlewares/middlewares")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.get("/myMiddleware",commonMW.myMiddleware, Controller.callAfterMiddleware  )




module.exports = router;