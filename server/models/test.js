var {mongoose} = require('../db/mongoose');
let autoIncrement=require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);
let testSchema =new mongoose.Schema({
    courseID:{
       type:Number,
       trim:true,
       required: true
    },
    studentID:{
        type:Number,
        trim:true,
        required: true
    },
    testName:{
        type:String,
        trim:true,
        required: true
    },
    result:{
        type:Number,
        required: true
    }
})
testSchema.plugin(autoIncrement.plugin,'test')
const Test=mongoose.model('test',testSchema)
module.exports = {Test}
