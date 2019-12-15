var {mongoose} = require('../db/mongoose');
let autoIncrement=require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);
let featuredCourseSchema =new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    teacher: {
        teacherId: {
            type: Number,
            trim: true,
            required: true
        },
        teacherName: {
            type: String,
            trim: true,
            required: true
        },
        linkAvatar: {
            type: String,
            trim: true,
            required: true
        },
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    content: {
        type: [String],
        trim: true,
        required: true
    },
    schedule: {
        type: [String],
        trim: true,
        required: true
    },
    studyTime: {
        lessonTime: {
            type: String,
            trim: true,
            required: true
        },
        courseTime: {
            type: String,
            trim: true,
            required: true
        }

    },
    tuition: {
        type: Number,
        required: true
    },
    categories: {
        type: [String],
        trim: true,
        required: true
    },
    topic: {
        type: [String],
        trim: true,
        required: true
    },
    subject: {
        type: String,
        trim: true,
        required: true
    },
    status:{
        type:String,
        trim:true,
        required:true
    }
})
featuredCourseSchema.plugin(autoIncrement.plugin,'featuredCourse')
const FeaturedCourse=mongoose.model('featuredCourse',featuredCourseSchema)
module.exports = {FeaturedCourse}
