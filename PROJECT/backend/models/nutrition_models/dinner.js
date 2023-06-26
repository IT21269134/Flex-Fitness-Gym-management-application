const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dinnerSchema = new Schema({
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

const dinner = mongoose.model("Nutrition_Dinner",dinnerSchema);
module.exports = dinner;