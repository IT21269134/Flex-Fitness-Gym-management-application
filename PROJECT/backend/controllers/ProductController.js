const Product = require("../models/ProductModel.js");
const User = require("../models/UserModel.js")
const Order = require("../models/orderModel.js")
const data = require("../data.js")
const mongoose = require('mongoose')
const getproducts =  async(req , res) => {
    const products = await Product.find();
    res.send(products)
}
const getOrderlist =  async(req , res) => {
  const orders = await Order.find();
    res.send(orders)
 
}
const getcategories = async(req , res) => {
        const categories = await Product.find().distinct('category');
        res.send(categories)
    }

const getcat =  async(req , res) => {
      const product = await Product.find({category: req.params.category});
        res.send(product)
    }


const getproduct = async(req , res ) =>{
    const product = await Product.findOne({id: req.params.id});
    if(product){
        res.send(product);
    }
    else{
        res.status(404).send({message : 'Product Not Found'})
    }
 
}
const getsearch =  async(req , res ) =>{
    const result = req.params.id
    const product = await Product.findOne({name:result});
   if(product){
        res.send(product);
    }
    else{
        res.status(404).send({message : 'Product Not Found'})
    }
  
  }
const getid =  async(req , res ) =>{
    const product = await Product.findById(req.params.id);
    if(product){
        res.send(product);
    }
    else{
        res.status(404).send({message : 'Product Not Found'})
    }
 
}

const getsearching = async(req , res) => {
  const results = await Product.find({name: req.query.q});
    res.json(results)
}
const getadmin = async (req, res) => {
    const productCategories = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);
    const Brand = await Product.aggregate([
      {
        $group: {
          _id: "$brand",
          count: { $sum: 1 },
        },
      },
    ]);
    const users = await User.aggregate([
      {
        $match: { isCustomer: true } 
      },
      {
        $group: {
          _id: null,
          numUsers: { $sum: 1 },
        },
      },
    ]);
    const products = await Product.aggregate([
      {
        $group: {
          _id: null,
          numProduct: { $sum: 1 },
        },
      },
    ]);
    const trainers = await User.aggregate([
      {
        $match: { isCoach: true } 
      },
      {
        $group: {
          _id: null,
          numUsers: { $sum: 1 },
        },
      },
    ]);
    const Doctors = await User.aggregate([
      {
        $match: {  isDoctor: true } 
      },
      {
        $group: {
          _id: null,
          numUsers: { $sum: 1 },
        },
      },
    ]);
    res.send( { users ,  productCategories , trainers , Doctors , products ,Brand } );
    }
  

    const getreview = async (req, res) => {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (product) {
          if (product.reviews.find((x) => x.name === req.user.name)) {
            return res
              .status(400)
              .send({ message: 'You already submitted a review' });
          }
    
          const review = {
            rating: Number(req.body.rating),
            name: req.body.name,
           comment: req.body.comment,
          };
          product.reviews.push(review);
          product.numReviews = product.reviews.length;
          product.rating =
            product.reviews.reduce((a, c) => c.rating + a, 0) /
            product.reviews.length;
          const updatedProduct = await product.save();
          res.status(201).send({
            message: 'Review Created',
            review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
            numReviews: product.numReviews,
            rating: product.rating,
          });
        } else {
          res.status(404).send({ message: 'Product Not Found' });
        }
      }
      const update = async(req , res) =>{
        const productId = req.params.id;
        const id = req.body.id
        const category = req.body.category
        const name = req.body.name
        const image = req.body.image
        const price = req.body.price
        const countInStock = req.body.countInStock
        const brand = req.body.brand
        const rating = req.body.rating
        
        const description = req.body.description
      
        const product = await Product.findById(productId);
        if (product) {
          product.name = name;
          product.slug = id;
          product.price = price;
          product.image = image;
          product.category = category;
          product.brand =brand;
          product.countInStock = countInStock;
          product.description = description;
          product.rating = rating;
          
          await product.save();
          res.send({ message: 'Product Updated' });
        } else {
          res.status(404).send({ message: 'Product Not Found' });
        }
      }
      const deletee = async(req ,res) =>{
             const id = req.params.id;
             await Product.findByIdAndRemove(id).exec();
             res.send("deleted")
      }
      const Orderr =  async(req , res) =>{
        
        // const name = req.body.name
        // const category = req.body.category
        // const price = req.body.price
        // const brand = req.body.brand
        const products = req.body
         
        
        // const address = req.body.address
        // const phoneNumber = req.body.phoneNumber
        // const country = req.body.country
        // const city = req.body.city
        // const state = req.body.state
        // const postalCode = req.body.postalCode

       
  const order = new Order({products
          })
      
          try {
            await order.save();
           res.send("inserted data")
            
          } catch (error) {
            console.log(error)
            
          }
      }
      const insert =  async(req , res) =>{
        const id = req.body.id
        const name = req.body.name
        const category = req.body.category
        const image = req.body.image
        const price = req.body.price
        const countInStock = req.body.countInStock
        const brand = req.body.brand
        const rating = req.body.rating
     
        const description = req.body.description
      
        const product = new Product({name : name , id : id , category : category , image : image 
          ,price : price , countInStock : countInStock , brand : brand , rating : rating
          ,numReviews : 10 , description : description})
      
          try {
            await product.save();
           
            res.send("inserted data")
            
          } catch (error) {
            console.log(error)
            
          }
      }
  
module.exports = {
    getproducts,
    getcategories,
    getcat,
    getproduct,
    getsearch,
    getid,
    getsearching,
    getadmin,
    getreview,
    update,
    deletee,
    insert,
    Orderr,
    getOrderlist
}


