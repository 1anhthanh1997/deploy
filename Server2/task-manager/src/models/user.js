var {mongoose} = require('../db/mongoose');
const bcript=require('mongoose-bcrypt');
// let ObjectId=mongoose.Schema.Types.ObjectId;
let autoIncrement=require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);
let userSchema =new mongoose.Schema({
    // _id:{
    //     type:Number
    // },
    username: {
        type: String,
        unique:true,
        required: [true, "Username is required"],
        // index: {unique: true}
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        validate: {
            validator: (value) => {
                let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

                if (value.toLowerCase() == value || !format.test(value) || !/\d/.test(value)) {
                    throw new Error("Password is invalid");
                }

            },
            message: 'Password is invalid'
        }
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minLength: 9
    },
    class: {
        type: String,
        require: true,
        trim: true
    },
    permission: {
        type: String,
        required: false
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})
// userSchema.statics.findByCredentials=async (username,password)=>{
//     console.log("Hello World")
//     const user=await User.findOne({username:username})
//     if(!user){
//         throw new Error('Unable to login')
//     }
//     const isMatch=await bcript.compare(password,user.password)
//     if(!isMatch) throw new Error('Unable to login')
//     return user
// }
userSchema.pre('save',async function (next) {
    const user=this;
    if(user.isModified('password')){
        user.password=await bcript.hash(user.password,1);
        console.log(user.password);
    }
    next();
})
userSchema.plugin(autoIncrement.plugin,'User')
const User=mongoose.model('User',userSchema)
module.exports = {User}
