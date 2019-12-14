var {mongoose} = require('../db/mongoose');
let autoIncrement=require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);
let topicSchema =new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    }
})
topicSchema.plugin(autoIncrement.plugin,'topic')
const Topic=mongoose.model('topic',topicSchema)
module.exports = {Topic}
