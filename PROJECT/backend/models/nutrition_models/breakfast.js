const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const breakfastSchema = new Schema({
    food_name : {
        type : String,
        required : true //backend validation
    },
    calories : {
        type : String,
        required : true
    },
    totalFat : {
        type : String,
        required : true
    },
    totalCarb : {
        type : String,
        required : true
    },
    totalProtein : {
        type : String,
        required : true
    }
})

const breakfast = mongoose.model("Nutrition_Breakfast",breakfastSchema);
module.exports = breakfast;