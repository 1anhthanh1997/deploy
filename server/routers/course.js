const express = require('express')
const {Course} = require("../models/course")
const router = express.Router()
const multer = require('multer')
const sharp = require('sharp')
const upload = multer({
    limits: {
        fileSize: 10000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
    }
})
router.post('/courses',async (req, res) => {
    try{
        const course=req.body
        // var course = new Course({
        //         //     name: req.body.name,
        //         //     teacher:{
        //         //         teacherId: req.body.teacher.teacherId,
        //         //         teacherName: req.body.teacher.teacherName,
        //         //
        //         //     },
        //         //     description:req.body.description,
        //         //     content:[],
        //         //     schedule: [],
        //         //     studyTime: {
        //         //         lessonTime: req.body.studyTime.lessonTime,
        //         //         courseTime: req.body.studyTime.courseTime,
        //         //     },
        //         //     tuition: req.body.tuition,
        //         //     categories: [],
        //         //     topic: req.body.topic,
        //         //     subject: req.body.subject,
        //         // });
        //         // for (var i = 0; i < req.body.schedule.length; i++) {
        //         //     course.schedule.push(req.body.schedule[i]);
        //         // }
        //         // for (var i = 0; i < req.body.categories.length; i++) {
        //         //     course.categories.push(req.body.categories[i]);
        //         // }
        //         // for (var i = 0; i < req.body.content.length; i++) {
        //         //     course.content.push(req.body.content[i]);
        //         // }
        course.save()
        res.send(course)
    }catch (e) {
        res.send(e)
    }


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
router.get('/courses/:id', (req, res) => {
    // console.log(req.query.subject);
    Course.findById(req.params.id).then((courses) => {
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
