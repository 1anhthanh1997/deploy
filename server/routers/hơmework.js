const express = require('express')
const {Homework} = require("../models/homework")
const router = express.Router()
router.post('/homeworks', (req, res) => {
    var homework = new Homework({
        courseID:req.body.courseID,
        teacherID:req.body.teacherID,
        homeworkName:req.body.homeworkName,
        homeworkContent: req.body.homeworkContent,
        deadline: req.body.deadline
    });
    homework.save().then((doc) => {
        res.send(doc)
    }).catch((err) => res.send(err))
})
//get all homework of courses
router.get('/homeworks/courseID', (req, res) => {
    let courseID=req.query.courseID
    Homework.find({courseID:courseID}).then((docs) => {
        res.send(docs)
    }).catch((err) => res.send(err))
})
router.get('/homeworks/:id', (req, res) => {
    // console.log(req.query.subject);
    Homework.findById(req.params.id).then((courses) => {
        res.send(courses)
    }).catch((err) => res.send(err))
})
router.patch('/homeworks/:id', (req, res) => {
    Homework.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}).then((docs) => {
        if(!docs) return res.status(404).send()
        res.send(docs)
    }).catch((err)=>res.status(400).send(err))

})
//Delete course
router.delete('/homeworks/:id',(req,res)=>{
    Homework.findByIdAndRemove(req.params.id).then((docs)=>{
        if(!docs) return res.status(404).send()
        res.send(docs)
    })
})

module.exports = router
