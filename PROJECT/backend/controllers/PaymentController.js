const bcrypt = require('bcrypt')
const Card = require('../models/PaymentSchema')
const mongoose = require('mongoose')


//controller for add payment method
exports.addCard = async (req,res) => {
    try{
        let{holderName, cardNumber, expDate, cvvNumber} = req.body;

        if(!req.body){
            res.status(406).json({err : "Please fill the details"})
        }

        //Data hashing
        const cardN = await bcrypt.hashSync(cardNumber,10)
        const exp = await bcrypt.hashSync(expDate,10)
        const cvv = await bcrypt.hashSync(cvvNumber,10)

        const newCard =new Card({
            holderName,
            cardNumber: cardN,
            expDate: exp,
            cvvNumber: cvv
        })

        newCard
            .save(newCard)
            .then(addC => {
                res.json(addC)
            })
            .catch(error => {
                res.status(404).json({err: error.message || "Something went wrong"})
            })

    }catch(error){
        res.status(500).json({message: error.message || "Error adding card"});
    }
}



//get all cards
exports.getAllCard = async (req, res) =>{
    const Cards = await Card.find({}).sort({createdAt: -1})

    res.status(200).json(Cards)
}


// //get single card
exports.getCard = async (req, res) =>{
    const { id } = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({err: "Invalid card"})
    }

    const card = await Card.findById(id)

    if(!card){
        return res.status(404).json({error: 'there is card'})
    }

    res.status(200).json(card)
}

//delete card controller
exports.deleteCard =async (req, res) =>{
    const { id } = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({err: "Invalid card"})
    }

    const card = await Card.findByIdAndDelete({_id: id})

    
    if(!card){
        return res.status(404).json({error: 'there is card'})
    }

    res.status(200).json(card)
}


//update card controller
exports.updateCard = async (req, res) =>{
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({err: "Invalid card"})
    }

    const card = await Card.findByIdAndUpdate({_id: id},{
        ...req.body
    })

    if(!card){
        return res.status(404).json({error: 'there is card'})
    }

    res.status(200).json(card)
}


//controller for add address
exports.addAddress = async(req, res) =>{
    try{
        let{name, phoneNumber, country, address, city, state, postalCode} = req.body;

        const newAddress = new Address({
            name,
            phoneNumber, 
            country, 
            address, 
            city, 
            state, 
            postalCode
        })

        newAddress
            .save(newAddress)
            .then(addA =>{
                res.json(addA)
            })
            .catch(error => {
                res.status(404).json({err: error.message || "Something went wrong"})
            })

        if(!req.body){
            res.status(406).json({err : "Please fill the details"})
        }



    }catch(error){
        res.status(500).json({message: error.message || "Error adding card"});
        
    }
}


//get all addresses
exports.getAllAddresses = async (req, res) =>{
    const addresses = await Address.find({}).sort({createdAt: -1})

    res.status(200).json(addresses)
}

//get single address
exports.getSingalAddress = async (req, res) =>{
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({err: "Sorry"})
    }

    const address = await Address.findById(id)

    if(!address){
        return res.status(404).json({error: 'there is no address'})
    }

    res.status(200).json(address)
}


//update address
exports.updateAddress = async (req, res) =>{
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({err: "Sorry"})
    }

    const address = await Address.findByIdAndUpdate({_id: id},{
        ...req.body
    })

    if(!address){
        return res.status(404).json({error: 'there is no address'})
    }

    res.status(200).json(address)
}

//delete address
exports.deleteAddress = async (req, res) =>{
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({err: "Sorry"})
    }

    const address = await Address.findByIdAndDelete({_id: id})

    if(!address){
        return res.status(404).json({error: 'there is no address'})
    }

    res.status(200).json(address)
}



//Add new Expense
exports.addExpense = async (req, res) =>{
    try{

        let{expenseName, expenseDes, expenseAmount} = req.body;
        if(!req.body){
            res.status(406).json({err : "Please fill the details"})
        }else{

            const newExpense = new Expense({
                expenseName,
                expenseDes,
                expenseAmount,
            })

            newExpense
            .save(newExpense)
            .then(addE =>{
                res.json(addE)
            })
            .catch(error => {
                res.status(404).json({err: error.message || "Something went wrong"})
            })

        }

    }catch(error){
        res.status(500).json({message: error.message || "Error adding expence"});
    }
}

//get all expenses
exports.getAllExpenses = async (req, res) =>{
    const expenses = await Expense.find({}).sort({createdAt: -1})

    res.status(200).json(expenses)
}

//delete expense
exports.deleteExpense = async (req, res) =>{
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){   
        return res.status(404).json({err: "Sorry"})
    }

    const expense = await Expense.findByIdAndDelete({_id: id})
    if(!expense){
        return res.status(404).json({error: 'there is no expense'})
    }

    res.status(200).json(expense)
}


//get single expense
exports.getSingleExpense = async (req, res) =>{
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({err: "Sorry"})
    }

    const expense = await Expense.findById(id)

    if(!expense){
        return res.status(404).json({error: 'there is no expense'})
    }

    res.status(200).json(expense)
}


//update expense
exports.updateExpense = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID' });
    }
  
    try {
      const exp = await Expense.findByIdAndUpdate(id, req.body, { new: true });
      if (!exp) {
        return res.status(404).json({ error: 'Expense not found' });
      }
      res.status(200).json(exp);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// exports.updateExpense = async (req, res) =>{
//     const exId = req.params.id;
//     const exname = req.body.expenseName;
//     const exdes = req.body.expenseDes;
//     const examount = req.body.expenseAmount;

//     const updateExpense = await Expense.findById(exId);
//     if(updateExpense) {
//         updateExpense.expenseName = exname;
//         updateExpense.expenseDes = exdes;
//         updateExpense.expenseAmount = examount;

//         const updatedExpense = await updateExpense.save();
//         if(updatedExpense){
//             return res.status(200).send({message: 'Expense Updated', data: updatedExpense})
//         }
//     }

// }


// exports.updateAddress = async (req, res) =>{
//     const { id } = req.params;
//     if(!mongoose.Types.ObjectId.isValid(id)){
//         return res.status(404).json({err: "Sorry"})
//     }

//     const address = await Address.findByIdAndUpdate({_id: id},{
//         ...req.body
//     })

//     if(!address){
//         return res.status(404).json({error: 'there is no address'})
//     }

//     res.status(200).json(address)
// }