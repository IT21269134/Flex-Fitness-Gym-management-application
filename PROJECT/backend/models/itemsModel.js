//This file contains the schema for the items collection in the database
const mongoose = require('mongoose')

//declare schema
const Schema = mongoose.Schema

//create schema
const itemsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  }
}, { timestamps: true })

//create & export model based on schema
module.exports = mongoose.model('Item', itemsSchema)