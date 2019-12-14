var {mongoose} = require('../db/mongoose');
let autoIncrement=require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);
let reviewSchema =new mongoose.Schema({
    courseID:{
        type:Number,
        trim: true,
        required:true
    },
    studentID:{
        type:Number,
        trim: true,
        required:true
    },
    reviewTitle:{
        type:String,
        required:true,
        trim:true,
    },
    reviewContent:{
        type:String,
        required:true,
        trim:true,
    }

})
reviewSchema.plugin(autoIncrement.plugin,'review')
const Review=mongoose.model('review',reviewSchema)
module.exports = {Review}
