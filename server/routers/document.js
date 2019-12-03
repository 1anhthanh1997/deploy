const express = require('express')
const {Document} = require("../models/document")
const router = express.Router()
router.post('/documents', (req, res) => {
    var document = new Document({
       courseID:req.body.courseID,
       teacherID:req.body.teacherID,
       documentName:req.body.documentName,
       documentContent: req.body.documentContent
    });
    document.save().then((doc) => {
        res.send(doc)
    }).catch((err) => res.send(err))
})
//get all document of courses
router.get('/documents/courseID', (req, res) => {
    let courseID=req.query.courseID
    Document.find({courseID:courseID}).then((docs) => {
        res.send(docs)
    }).catch((err) => res.send(err))
})
router.get('/documents/:id', (req, res) => {
    // console.log(req.query.subject);
    Document.findById(req.params.id).then((courses) => {
        res.send(courses)
    }).catch((err) => res.send(err))
})
router.patch('/documents/:id', (req, res) => {
    Document.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}).then((docs) => {
        if(!docs) return res.status(404).send()
        res.send(docs)
    }).catch((err)=>res.status(400).send(err))

})
//Delete course
router.delete('/documents/:id',(req,res)=>{
    Document.findByIdAndRemove(req.params.id).then((docs)=>{
        if(!docs) return res.status(404).send()
        res.send(docs)
    })
})

module.exports = router
