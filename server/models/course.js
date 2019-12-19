var {mongoose} = require('../db/mongoose');
let autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);
let courseSchema = new mongoose.Schema({
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
        avatar: {
            type: Buffer,
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
    }

})
courseSchema.plugin(autoIncrement.plugin, 'course')
const Course = mongoose.model('course', courseSchema)
module.exports = {Course}
