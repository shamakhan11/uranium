const callAfterMiddleware= async function (req, res) {
    res.send({ msg: "Call after middleware" })
}

module.exports.callAfterMiddleware=callAfterMiddleware