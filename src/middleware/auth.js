const jwt = require("jsonwebtoken");

const authenticate = function(req, res, next) {
    //check the token in request header
    //validate this token
    try {
        token = req.headers["x-auth-token"];
      if (!token) {
        return res.send({ status: false, msg: "Token must be present" });
      }
  
      let verifyUser = jwt.verify(token, "FunctionUp-Uranium");
  
      if (!verifyUser) {
        return res.send({ status: false, msg: "Token is incorrect" });
      }
      next();
    } catch (err) {
      res.status(400).send({ msg: err })
    }
    
}

const authorise = function(req, res, next) {
    // comapre the logged in user's id and the id in request
    try {
        let token = req.headers["x-auth-token"];
        let decodedToken = jwt.verify(token, "FunctionUp-Uranium")
        let userToBeModified = req.params.userId
        let userLoggedIn = decodedToken.userId
        if (userToBeModified != userLoggedIn) {
          return res.send({ status: false, msg: 'User logged is not allowed to modify the requested users data' })
        } else {
          next();
        }
      } catch (err) {
        res.status(400).send({ msg: err })
      }
}
module.exports.authUser = authenticate;
module.exports.authorizedUser =authorise;