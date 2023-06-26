const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    holderName:{
        type: String,
        unique: true,
        require: true
    },
    cardNumber:{
        type: String,
        unique: true,
        require: true
    },
    expDate:{
        type: String,
        unique: true,
        require: true
    },
    cvvNumber:{
        type: String,
        unique: true,
        require: true
    }
},
{timestamps: true})

const addressSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    phoneNumber:{
        type: String,
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
    state:{
        type: String,
        require: true
    },
    postalCode:{
        type: String,
        require: true
    },
    date:{
        type: Date,
        default: Date.now
    }
})

const ExpenseSchema = new mongoose.Schema({
    expenseName:{
        type: String,
        require: true
    },
    expenseDes:{
        type: String,
        require: true
    },
    expenseAmount:{
        type: Number,
        require: true
    },
    expenceStatus:{
        type: String,
        default: 'Not Paid'
    },
    expenseDate:{
        type: Date,
        default: Date.now
    }
})


module.exports = Expense = mongoose.model('Expense', ExpenseSchema)
module.exports = Address = mongoose.model('Address',addressSchema)
module.exports = Card = mongoose.model('Card', cardSchema)