var {mongoose} = require('../db/mongoose');
let autoIncrement=require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);
let documentSchema =new mongoose.Schema({
    courseID:{
        type:Number,
        required:true,
        trim:true,
    },
    teacherID:{
        type:Number,
        required:true,
        trim:true,
    },
   documentName:{
       type:String,
       required:true,
       trim:true,
   },
    documentContent:{
        type:String,
        required:true,
        trim:true,
    }

})
documentSchema.plugin(autoIncrement.plugin,'document')
const Document=mongoose.model('document',documentSchema)
module.exports = {Document}
