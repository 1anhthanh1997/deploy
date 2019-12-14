const express = require('express')
const {Question} = require("../models/question")
const router = express.Router()
router.post('/questions', (req, res) => {
    var question = new Question({
        testID:req.body.testID,
        question:req.body.question,
        optionA:req.body.optionA,
        optionB:req.body.optionB,
        optionC: req.body.optionC,
        optionD: req.body.optionD,
        answer: req.body.answer
    });
    question.save().then((doc) => {
        res.send(doc)
    }).catch((err) => res.send(err))
})
//get all question of courses
router.get('/questions/testID', (req, res) => {
    let testID=req.query.testID
    Question.find({testID:testID}).then((docs) => {
        res.send(docs)
    }).catch((err) => res.send(err))
})
router.get('/questions/:id', (req, res) => {
    // console.log(req.query.subject);
    Question.findById(req.params.id).then((courses) => {
        res.send(courses)
    }).catch((err) => res.send(err))
})
router.patch('/questions/:id', (req, res) => {
    Question.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}).then((docs) => {
        if(!docs) return res.status(404).send()
        res.send(docs)
    }).catch((err)=>res.status(400).send(err))

})
//Delete course
router.delete('/questions/:id',(req,res)=>{
    Question.findByIdAndRemove(req.params.id).then((docs)=>{
        if(!docs) return res.status(404).send()
        res.send(docs)
    })
})

module.exports = router
