var {mongoose} = require('../db/mongoose');
let autoIncrement=require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);
let lectureSchema =new mongoose.Schema({
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
    lectureName:{
        type:String,
        required:true,
        trim:true,
    },
    lectureContent:{
        type:String,
        required:true,
        trim:true,
    },
    lectureLink:{
        type:String,
        required:true,
        trim:true,
    }

})
lectureSchema.plugin(autoIncrement.plugin,'lecture')
const Lecture=mongoose.model('lecture',lectureSchema)
module.exports = {Lecture}
