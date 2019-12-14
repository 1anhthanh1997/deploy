var {mongoose} = require('../db/mongoose');
let autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);
let classGroupSchema = new mongoose.Schema({
    courseID: {
        type: Number,
        trim: true,
        required: true
    },
    classGroupName: {
        type: String,
        trim: true,
        required: true
    },
    linkAvatar: {
        type: String,
        trim: true,
        required: true
    },
    members: [{
        id: {
            unique: true,
            type: Number
        },
        username: {
            type: String
        }
    }],
    requests: [{
        id: {
            type: Number,
            unique: true
        },
        username: {
            type: String
        }
    }],
    notifications: [{
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        date_create: {
            type: Date
        }
    }]


})
classGroupSchema.methods.addRequest = async function (id, username) {
    const classGroup = this
    let request = {
        id: id,
        username: username
    }
    classGroup.requests.push(request)
    await classGroup.save()
    return classGroup
}
classGroupSchema.methods.addNotification = async function (title, content,date) {
    const classGroup = this
    let notification = {
        title: title,
        content: content,
        date_create:date
    }
    classGroup.notifications.push(notification)
    await classGroup.save()
    return classGroup
}
classGroupSchema.methods.deleteRequest = async function (id) {
    const classGroup = this

    classGroup.requests.push(request)
    await classGroup.save()
    return classGroup
}
classGroupSchema.methods.addMember = async function (id, username) {
    const classGroup = this
    let member = {
        id: id,
        username: username
    }
    classGroup.members.push(member)
    await classGroup.save()
    return classGroup
}
classGroupSchema.plugin(autoIncrement.plugin, 'classGroup')
const ClassGroup = mongoose.model('classGroup', classGroupSchema)
module.exports = {ClassGroup}
