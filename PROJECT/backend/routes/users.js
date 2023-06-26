// const express =require ("express");
const userouter =require ("express").Router();
let User =require('../models/user');
// const app = express(); 

//Add a user
userouter.route("/add").post((req,res)=>{

    const NIC=req.body.NIC;                                 
    const firstName =req.body.firstName;
    const lastName =req.body.lastName;
    const email = req.body.email;
    const phone =req.body.phone;
    const address =req.body.address;
    const gender =req.body.gender;
    

    // instanciate 
    const newUser =new User({
        NIC,
        firstName,
        lastName,
        email,
        phone,
        address,
        gender
    })

    //if new user is added response as user added , else show the error (Ex: exception handling)
    newUser.save().then(() =>{
        res.json("User added");
    }).catch((err)=>{
        console.log(err);
    })
    
})

//read data
userouter.route("/").get((req,res)=> {
    User.find().then((users)=>{
        res.json(users)
    }).catch((err) =>{
        console.log(err);
    })
})

// update user
userouter.route("/update/:NIC").put(async(req,res)=> {
    let userId =req.params.NIC;
    const NIC=req.body.NIC;                                 
    const firstName =req.body.firstName;
    const lastName =req.body.lastName;
    const email = req.body.email;
    const phone =Number(req.body.phone);
    const address =req.body.address;
    const gender =req.body.gender;
    
    const updateUser = {
        NIC,
        firstName,
        lastName,
        email,
        phone,
        address,
        gender
    }
    const update=User.findOneAndUpdate(userId,updateUser)
    .then(()=>{
        res.status(200).send({status :"User updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with update data"});
    })
})

//delete user
userouter.route("/delete/:NIC").delete(async(req,res)=>{
    let userId =req.params.NIC;

    await User.findOneAndDelete(userId).then(()=>{
        res.status(200).send({status:"User delete"});
    }).catch((err)=>{
        res.status(500).send({status :"Error with delete user",error :err.message});
    })
    })
    
//get data from extract user
userouter.route("/get/:NIC").get(async(req,res)=> {
    let userId =req.params.NIC;
    const NIC=req.body.NIC;                                 
    const firstName =req.body.firstName;
    const lastName =req.body.lastName;
    const email = req.body.email;
    const phone =Number(req.body.phone);
    const address =req.body.address;
    const gender =req.body.gender;

    const user =await User.findOne(NIC)
    .then((user)=>{
        res.status(200).send({status:"User fetched",user:user})
    }).catch((err)=>{
        console.log(err.message);
    })
})


module.exports =userouter;
























