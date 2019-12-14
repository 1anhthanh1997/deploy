const express = require('express')
const {Lecture} = require("../models/lecture")
const router = express.Router()
router.post('/lectures', (req, res) => {
    var lecture = new Lecture({
        courseID:req.body.courseID,
        teacherID:req.body.teacherID,
        lectureName:req.body.lectureName,
        lectureContent: req.body.lectureContent,
        lectureLink:req.body.lectureLink
    });
    lecture.save().then((doc) => {
        res.send(doc)
    }).catch((err) => res.send(err))
})
//get all lecture of courses
router.get('/lectures/courseID', (req, res) => {
    let courseID=req.query.courseID
    Lecture.find({courseID:courseID}).then((docs) => {
        res.send(docs)
    }).catch((err) => res.send(err))
})
router.get('/lectures/:id', (req, res) => {
    // console.log(req.query.subject);
    Lecture.findById(req.params.id).then((docs) => {
        res.send(docs)
    }).catch((err) => res.send(err))
})
router.patch('/lectures/:id', (req, res) => {
    Lecture.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}).then((docs) => {
        if(!docs) return res.status(404).send()
        res.send(docs)
    }).catch((err)=>res.status(400).send(err))

})
//Delete course
router.delete('/lectures/:id',(req,res)=>{
    Lecture.findByIdAndRemove(req.params.id).then((docs)=>{
        if(!docs) return res.status(404).send()
        res.send(docs)
    })
})

module.exports = router
