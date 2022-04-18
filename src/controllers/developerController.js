const developerModel= require("../models/developerModel");
const BatchModel = require("../models/batchModel");


const createDeveloper= async function (req, res) {
    let developer = req.body
    let developerCreated = await developerModel.create(developer)
    res.send({data: developerCreated})
}

const getDevelopersData= async function (req, res) {
    let developers = await developerModel.find()
    res.send({data: developers})
}

const scholarshipDevelopers = async function (req, res) {
    let scholarship = await developerModel.find({$and:[{gender:"female"},{percentage:{$gte:70}}]})
    res.send({data: scholarship})

}

const selectedDevelopers = async function (req, res) {
        const program = req.query.program
        const percentage = req.query.percentage
         const getbatchId = await BatchModel.findOne({ name: program }).select({_id:1})
         const selectedDeveloper = await developerModel.find({batch : getbatchId,percentage:{ $gt:percentage}}).populate('batch').select({_id:0,createdAt:0,updatedAt:0})
        
        res.send({ msg: selectedDeveloper })
    
}

module.exports.createDeveloper= createDeveloper
module.exports.getDevelopersData= getDevelopersData
module.exports.scholarshipDevelopers = scholarshipDevelopers
module.exports.selectedDevelopers = selectedDevelopers