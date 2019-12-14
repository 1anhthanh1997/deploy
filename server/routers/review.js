const express = require('express')
const {Review} = require("../models/review")
const router = express.Router()
router.post('/reviews', (req, res) => {
    var review = new Review({
        courseID:req.body.courseID,
        studentID:req.body.studentID,
        reviewTitle:req.body.reviewTitle,
        reviewContent: req.body.reviewContent
    });
    review.save().then((doc) => {
        res.send(doc)
    }).catch((err) => res.send(err))
})
//get all review of courses
router.get('/reviews/courseID', (req, res) => {
    let courseID=req.query.courseID
    Review.find({courseID:courseID}).then((docs) => {
        res.send(docs)
    }).catch((err) => res.send(err))
})
router.get('/reviews/:id', (req, res) => {
    // console.log(req.query.subject);
    Review.findById(req.params.id).then((courses) => {
        res.send(courses)
    }).catch((err) => res.send(err))
})
router.patch('/reviews/:id', (req, res) => {
    Review.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}).then((docs) => {
        if(!docs) return res.status(404).send()
        res.send(docs)
    }).catch((err)=>res.status(400).send(err))

})
//Delete course
router.delete('/reviews/:id',(req,res)=>{
    Review.findByIdAndRemove(req.params.id).then((docs)=>{
        if(!docs) return res.status(404).send()
        res.send(docs)
    })
})

module.exports = router
