var {mongoose} = require('../db/mongoose');
let course
let autoIncrement=require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);
let notificationSchema= new mongoose.Schema({
    senderID:{
        type:Number,
        required:true
    },
    title:{
        type: String,
        required:true
    },
    content:{
        type:String,
        required: true
    },
    date:{
      type:Date
    }
})
notificationSchema.plugin(autoIncrement.plugin, 'notification')
const Notification = mongoose.model('notification', notificationSchema)
module.exports = {Notification}
