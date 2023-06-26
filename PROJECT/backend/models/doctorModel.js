const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: [true, 'first name is required'],
    },
    lastName:{
        type: String,
        required: [true, 'last name is required'],
    },
    email:{
        type: String,
        required: [true, 'email is required'],
    },
    password:{
        type: String,
        required: [true, 'password is required'],
    },
    phone:{
        type: String,
        required: [true, 'phone is required'],
    },
    specialization : {
        type: String,
        required : true,
    },
    designation : {
        type: String,
        required : true,
    },
    experience : {
        type: String,
        required : true,
    },
    timings : {
        type: Array,
        required : true,
    },

    isDoctor:{
        type:Boolean,
        default: false,
    },

    isAdmin: {
        type:Boolean,
        default: false,
    },
    // seenNotifications: {
    //     type: Array,
    //     default: [],
    // },
    // unseenNotifications: {
    //     type: Array,
    //     default: [],
    // },
    
},
{
    timestamps: true,
}
);

const doctorModel = mongoose.model('doctor', DoctorSchema)

module.exports = doctorModel;