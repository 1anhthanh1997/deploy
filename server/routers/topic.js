const express = require('express')
const {Topic} = require("../models/topic")
const router = express.Router()
router.post('/topics', (req, res) => {
    var topic = new Topic({
        name:req.body.name
    });
    topic.save().then((doc) => {
        res.send(doc)
    }).catch((err) => res.send(err))
})
//get all topic of courses
router.get('/topics/courseID', (req, res) => {
    let courseID=req.query.courseID
    Topic.find({courseID:courseID}).then((docs) => {
        res.send(docs)
    }).catch((err) => res.send(err))
})
router.get('/topics/:id', (req, res) => {
    // console.log(req.query.subject);
    Topic.findById(req.params.id).then((courses) => {
        res.send(courses)
    }).catch((err) => res.send(err))
})
router.patch('/topics/:id', (req, res) => {
    Topic.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}).then((docs) => {
        if(!docs) return res.status(404).send()
        res.send(docs)
    }).catch((err)=>res.status(400).send(err))

})
//Delete course
router.delete('/topics/:id',(req,res)=>{
    Topic.findByIdAndRemove(req.params.id).then((docs)=>{
        if(!docs) return res.status(404).send()
        res.send(docs)
    })
})

module.exports = router
