var {mongoose} = require('../db/mongoose');
let autoIncrement=require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);
let courseSchema =new mongoose.Schema({
    name:{
        type:String,
        trim: true,
        required:true
    },
    teacherId:{
        type:String,
        trim: true,
        required:true
    },
    schedule:{
        type:String,
        trim:true,
        required: true
    },
    studyTime:{
        lessonTime:{
            type:String,
            trim:true,
            required: true
        },
        courseTime:{
            type:String,
            trim:true,
            required: true
        }

    },
    tuition:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        trim:true,
        required: true
    },
    topic:{
        type:String,
        trim:true,
        required: true
    },
    subject:{
        type:String,
        trim:true,
        required: true
    }
})
courseSchemaSchema.plugin(autoIncrement.plugin,'user')
const Course=mongoose.model('user',courseSchema)
module.exports = {Course}
