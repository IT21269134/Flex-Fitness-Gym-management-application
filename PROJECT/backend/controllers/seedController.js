const Product = require("../models/orderModel");

const mongoose = require('mongoose')
const data =require( "../data.js")
const  setproducts = async(req , res) => {
  
    const createProducts = await Product.insertMany(data.products);
    res.send({createProducts})

}
module.exports = {
    setproducts
  }