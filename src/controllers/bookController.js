const BookModel= require("../models/bookModel")

const createBook= async function (req, res) {
    let data= req.body
    let savedBook= await BookModel.create(data)
    res.send({msg: savedBook})
}

const getBooksData= async function (req, res) {
    let allBooks= await BookModel.find()
    res.send({msg: allBooks})
}

module.exports.createBook= createBook
module.exports.getBooksData= getBooksData