var {mongoose} = require('../db/mongoose');
let autoIncrement=require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);
let testSchema =new mongoose.Schema({
    testName:{
        type:String,
        trim:true,
        required: true
    },
    time:{
        type:Number,
        required: true
    },
    content:[{
        question:{
            type:String,
            required:true
        },
        option:[{
            type:String,
            require:true
        }],
        answer:{
            type:Number,
            required:true
        }
    }]


})
testSchema.plugin(autoIncrement.plugin,'test')
const Test=mongoose.model('test',testSchema)
module.exports = {Test}
