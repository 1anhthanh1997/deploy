const express = require('express')
const {FeaturedCourse} = require("../models/featuredCourse")
const router = express.Router()
router.post('/featuredCourses', (req, res) => {
    var featuredCourse = new FeaturedCourse({
        name: req.body.name,
        teacher:{
            teacherId: req.body.teacher.teacherId,
            teacherName: req.body.teacher.teacherName,
            linkAvatar:req.body.teacher.linkAvatar
        },
        description:req.body.description,
        content:[],
        schedule: [],
        studyTime: {
            lessonTime: req.body.studyTime.lessonTime,
            courseTime: req.body.studyTime.courseTime,
        },
        tuition: req.body.tuition,
        categories: [],
        topic: req.body.topic,
        subject: req.body.subject,
        status:req.body.status
    });
    for (var i = 0; i < req.body.schedule.length; i++) {
        featuredCourse.schedule.push(req.body.schedule[i]);
    }
    for (var i = 0; i < req.body.categories.length; i++) {
        featuredCourse.categories.push(req.body.categories[i]);
    }
    for (var i = 0; i < req.body.content.length; i++) {
        featuredCourse.content.push(req.body.content[i]);
    }
    featuredCourse.save().then((doc) => {
        res.send(doc)
    }).catch((err) => res.send(err))
})
router.get('/featuredCourses', (req, res) => {
    FeaturedCourse.find().then((featuredCourses) => {
        res.send(featuredCourses)
    }).catch((err) => res.send(err))
})
router.get('/featuredCourses/topic', (req, res) => {
    // console.log(req.query.subject);
    FeaturedCourse.find({subject: req.query.subject}).then((featuredCourses) => {
        res.send(featuredCourses)
    }).catch((err) => res.send(err))
})
router.patch('/featuredCourses/:id', (req, res) => {
    FeaturedCourse.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}).then((featuredCourse) => {
        if(!featuredCourse) return res.status(404).send()
        res.send(featuredCourse)
    }).catch((err)=>res.status(400).send(err))

})
//Delete featuredCourse
router.delete('/featuredCourses/:id',(req,res)=>{
    FeaturedCourse.findByIdAndRemove(req.params.id).then((featuredCourse)=>{
        if(!featuredCourse) return res.status(404).send()
        res.send(featuredCourse)
    })
})

module.exports = router
