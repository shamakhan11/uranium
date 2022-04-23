const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createUser = async function (req, res) {
  try {
  let getUserData = req.body;
  let showData = await userModel.create(getUserData);
  res.send({ status: true, data: showData });
  }catch(err){
    res.status(400).send({msg:"Bad Request"})
  }  
};

const loginUser = async function (req, res) {
  try{
  let emailId = req.body.emailId;
  let password = req.body.password;

  let user = await userModel.findOne({ emailId: emailId, password: password });
  if (!user) {
    return res.send({ status: false, msg: "Email or password is not correct", });
  }

  let token = jwt.sign({ userId: user._id.toString() }, "FunctionUp-Uranium");
  res.setHeader("x-auth-token", token);
  res.send({ status: true, data: token });
}catch(err){
  res.status(400).send({msg:"Bad Request"})
}

};

const getUserData = async function (req, res) {
  try {
  let userId = req.params.userId;

  let userData = await userModel.findById(userId);
  if (!userData) {
    return res.send({ status: false, msg: "No such user exists" });
  }

  res.send({ status: true, data: userData });
}catch(err){
  res.status(404).send({msg:"Not found"})
}
};

const updateUser = async function (req, res) {
  try{
  let userId = req.params.userId;
  let user = await userModel.findById(userId);

  if (!user) {
    return res.send("No such user exists");
  }

  let userData = req.body;
  let updatedUser = await userModel.findOneAndUpdate(
    { _id: userId },
    { $set: userData },
    { new: true },
  );
  res.send({ status: true, data: updatedUser });
  }catch(err){
    res.status(404).send({msg:"Not found"})
  }
};

const deleteUser = async function (req, res) {
  try {
  let userId = req.params.userId;
  let user = await userModel.findOneAndUpdate(
    { _id: userId },
    { $set: { isDeleted: true } },
    { new: true }
  )

  res.send({ status: true, data: user });
  }catch(err){
    res.status(404).send({msg:"Not found"})
  }
}

const postMessage = async function (req, res) {
  try {
  let userId = req.params.userId;
  let myMessage = req.body.message;
  let user = await userModel.findById(userId);
  
  if (!user) {
    return res.send("No such user exists");
  }
  let updatedUser = await userModel.findOneAndUpdate(
    { _id: userId },
    { $set: {message:myMessage} },
    {upsert:true, new: true },
  );
  res.send({ status: true, data: updatedUser });
  }catch(err){
    res.status(404).send({msg:"Not found"})
  }
}

module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser;
module.exports.postMessage = postMessage;