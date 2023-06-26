const mongoose = require('mongoose')
const OrderSchema= new mongoose.Schema(
    {
        name : {type : String , required : true , unique : true}, 
        id : {type : String , required : true , unique : true}, 
        image : {type : String , required : true }, 
        brand : {type : String , required : true }, 
        category : {type : String , required : true}, 
        description : {type : String , required : true}, 
        price : {type : Number , required : true}, 
        countInStock : {type : Number , required : true}, 
        rating : {type : Number , required : true}, 
        numReviews : {type : Number , required : true},
        phoneNumber:{
            type: Number,
            require: true
        },
        country:{
            type: String,
            require: true
        },
        address:{
            type: String,
            require: true
        },
        city:{
            type: String,
            require: true
        },
       
        
      
    },
    {
        timestamps:true

    }
);



module.exports = mongoose.model('Orders' , OrderSchema)