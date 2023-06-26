const Item = require("../models/itemsModel");
const mongoose = require("mongoose");

// get all Items
const getItems = async (req, res) => {
  const Items = await Item.find({}).sort({ createdAt: -1 });

  res.status(200).json(Items);
};

// get a single Item
const getItem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Item" });
  }

  const obj = await Item.findById(id);

  if (!obj) {
    return res.status(404).json({ error: "No such Item" });
  }

  res.status(200).json(obj);
};

// create a new Item
const createItem = async (req, res) => {
  const { name, price, stock } = req.body;

  let emptyFields = [];

  if (!name) {
    emptyFields.push("name");
  }
  if (!price) {
    emptyFields.push("price");
  }
  if (!stock) {
    emptyFields.push("stock");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  //check if an item with the same name already exists
  const existingItem = await Item.findOne({ name: name });
  if (existingItem) {
    return res.status(400).json({ error: " Item already exists" });
  }

  //add the item to the database
  try {
    const obj = await Item.create({ name, price, stock });
    res.status(200).json(obj);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a Item
const deleteItem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such Item" });
  }

  const obj = await Item.findOneAndDelete({ _id: id });

  if (!obj) {
    return res.status(400).json({ error: "No such Item" });
  }

  res.status(200).json(obj);
};

// update a Item
const updateItem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such Item" });
  }

  const obj = await Item.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!obj) {
    return res.status(400).json({ error: "No such Item" });
  }

  res.status(200).json(obj);
};

module.exports = {
  getItems,
  getItem,
  createItem,
  deleteItem,
  updateItem,
};
