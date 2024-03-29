const express = require('express')
const {Test} = require("../models/test")
const router = express.Router()
router.post('/tests', async (req, res) => {
    try{
        const test= new Test(req.body);
        test.save();
        res.send()
    }catch (e) {
        res.status(400).send(e)
    }
})
//get all test of courses
router.get('/tests/courseID', (req, res) => {
    let courseID=req.query.courseID
    Test.find({courseID:courseID}).then((docs) => {
        res.send(docs)
    }).catch((err) => res.send(err))
})
router.get('/tests/:id', (req, res) => {
    // console.log(req.query.subject);
    Test.findById(req.params.id).then((courses) => {
        res.send(courses)
    }).catch((err) => res.send(err))
})
router.patch('/tests/:id', (req, res) => {
    Test.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}).then((docs) => {
        if(!docs) return res.status(404).send()
        res.send(docs)
    }).catch((err)=>res.status(400).send(err))

})
//Delete course
router.delete('/tests/:id',(req,res)=>{
    Test.findByIdAndRemove(req.params.id).then((docs)=>{
        if(!docs) return res.status(404).send()
        res.send(docs)
    })
})

module.exports = router
