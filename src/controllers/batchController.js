const BatchModel = require("../models/batchModel");

const createBatches = async function (req, res) {
  let batch = req.body;
  let batchCreated = await BatchModel.create(batch);
  res.send({ data: batchCreated });
};

const getBatchesData = async function (req, res) {
  let batches = await BatchModel.find();
  res.send({ data: batches });
};

module.exports.createBatches = createBatches;
module.exports.getBatchesData = getBatchesData;