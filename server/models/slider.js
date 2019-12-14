var {mongoose} = require('../db/mongoose');
let autoIncrement=require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);
let slideSchema =new mongoose.Schema({
    image:{
        type:Buffer,
        required:true
    }
})
slideSchema.plugin(autoIncrement.plugin,'slide')
const Slide=mongoose.model('slide',slideSchema)
module.exports = {Slide}
