const express = require('express')
const {ClassGroup} = require("../models/classGroup")
const router = express.Router()
router.post('/classGroups', (req, res) => {
    var classGroup = new ClassGroup({
        courseID:req.body.courseID,
        classGroupName:req.body.classGroupName,
        linkAvatar: req.body.linkAvatar
    });
    classGroup.save().then((doc) => {
        res.send(doc)
    }).catch((err) => res.send(err))
})
//get all classGroup of courses
router.get('/classGroups/courseID', (req, res) => {
    let courseID=req.query.courseID
    ClassGroup.find({courseID:courseID}).then((docs) => {
        res.send(docs)
    }).catch((err) => res.send(err))
})
router.get('/classGroups/:id', (req, res) => {
    // console.log(req.query.subject);
    ClassGroup.findById(req.params.id).then((courses) => {
        res.send(courses)
    }).catch((err) => res.send(err))
})
router.patch('/classGroups/:id', (req, res) => {
    ClassGroup.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}).then((docs) => {
        if(!docs) return res.status(404).send()
        res.send(docs)
    }).catch((err)=>res.status(400).send(err))

})
//Delete course
router.delete('/classGroups/:id',(req,res)=>{
    ClassGroup.findByIdAndRemove(req.params.id).then((docs)=>{
        if(!docs) return res.status(404).send()
        res.send(docs)
    })
})

module.exports = router
