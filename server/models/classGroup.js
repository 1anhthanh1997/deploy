var {mongoose} = require('../db/mongoose');
let autoIncrement=require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);
let classGroupSchema =new mongoose.Schema({
    courseID:{
        type:Number,
        trim:true,
        required: true
    },
    classGroupName:{
        type:String,
        trim:true,
        required: true
    },
    linkAvatar:{
        type:String,
        trim:true,
        required: true
    }


})
classGroupSchema.plugin(autoIncrement.plugin,'classGroup')
const ClassGroup=mongoose.model('classGroup',classGroupSchema)
module.exports = {ClassGroup}
