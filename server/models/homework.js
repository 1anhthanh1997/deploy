var {mongoose} = require('../db/mongoose');
let autoIncrement=require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);
let homeworkSchema =new mongoose.Schema({
    courseID:{
        type:Number,
        trim: true,
        required:true
    },
    teacherID:{
        type:Number,
        trim: true,
        required:true
    },
    homeworkName:{
        type:String,
        required:true,
        trim:true,
    },
    homeworkContent:{
        type:String,
        required:true,
        trim:true,
    },
    deadline:{
        type:String,
        required:true,
        trim:true,
    }

})
homeworkSchema.plugin(autoIncrement.plugin,'homework')
const Homework=mongoose.model('homework',homeworkSchema)
module.exports = {Homework}
