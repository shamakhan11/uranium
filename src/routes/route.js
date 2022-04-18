const express = require('express');
const router = express.Router();



const batchController= require("../controllers/batchController")
const developerController= require("../controllers/developerController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.post("/batches", batchController.createBatches  )


router.get("/getbatchesData", batchController.getBatchesData)


router.post("/developers", developerController.createDeveloper  )


router.get("/getDevelopersData", developerController.getDevelopersData  )


router.get("/scholarship-developers", developerController.scholarshipDevelopers)


router.get("/developers", developerController.selectedDevelopers  )

module.exports = router; 