const express = require('express')
const {Course} = require("../models/course")
const router = express.Router()
router.post('/courses', (req, res) => {
    var course = new Course({
        name: req.body.name,
        teacherId: req.body.teacherId,
        schedule: req.body.schedule,
        studyTime: {
            lessonTime: req.body.studyTime.lessonTime,
            courseTime: req.body.studyTime.courseTime,
        },
        tuition: req.body.tuition,
        categories: req.body.categories,
        topic: req.body.topic,
        subject: req.body.subject
    });
    course.save().then((doc) => {
        res.send(doc)
    }).catch((err) => res.send(err))
})
router.get('/courses', (req, res) => {
    Course.find().then((courses) => {
        res.send(courses)
    }).catch((err) => res.send(err))
})
router.get('/courses/topic', (req, res) => {
    // console.log(req.query.subject);
    Course.find({subject: req.query.subject}).then((courses) => {
        res.send(courses)
    }).catch((err) => res.send(err))
})
router.patch('/courses/:id', (req, res) => {
    Course.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}).then((course) => {
        if(!course) return res.status(404).send()
        res.send(course)
    }).catch((err)=>res.status(400).send(err))

})
//Delete course
router.delete('/courses/:id',(req,res)=>{
    Course.findByIdAndRemove(req.params.id).then((course)=>{
        if(!course) return res.status(404).send()
        res.send(course)
    })
})

module.exports = router