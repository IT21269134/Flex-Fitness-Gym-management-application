const express = require('express')

const {
  signin

} = require ("../../controllers/UserController.js")

const userRouter = express.Router();

 userRouter.post('/signin',signin);




// userRouter.post("/addCoach" , async(req , res) =>{
//   const name = req.body.name
//   const email = req.body.email
//   const password = req.body.password
//   const isAdmin = req.body.isAdmin
//   const isCoach = req.body.isCoach
//   const isDoctor = req.body.isDoctor
  

//   const user = new User({name : name , email : email , password: bcrypt.hashSync(password), isAdmin: isAdmin, isCoach : isCoach
//     ,isDoctor : isDoctor})

//     try {
//       await user.save();
     
//       res.send("Coach Added")
      
//     } catch (error) {
//       console.log(error)
      
//     }
// })


module.exports =userRouter
