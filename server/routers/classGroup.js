const express = require('express')
const {ClassGroup} = require("../models/classGroup")
// const {User}=require('../models/user')
const router = express.Router()
router.post('/classGroups/sendNotification/:id',async (req,res)=>{
    try{
        var today = new Date();
        console.log(today)
        let classGroup=await ClassGroup.findById(req.params.id)
        // console.log(classGroup)
        classGroup=await classGroup.addNotification(req.body.title,req.body.content,today)
        res.send(classGroup)
    }catch (e) {
        res.send(e)
    }
})
router.post('/classGroups/sendRequest/:id', async (req,res)=>{

    try{
        let classGroup=await ClassGroup.findById(req.params.id)
        console.log (classGroup)
        classGroup=await classGroup.addRequest(req.body.userId,req.body.username)

        res.send(classGroup)
    }catch (e) {
        res.send(e)
    }

})
router.post('/classGroups/refuseRequest/:id', async (req,res)=>{
    try{
        let classGroup=await ClassGroup.findById(req.params.id)

        classGroup.requests = await classGroup.requests.filter((request) => {
            // console.log(3!==3)
            // console.log(typeof request.userId )
            // console.log(typeof req.query.userId )
            return request.userId !== req.body.userId
        })
        console.log(classGroup.requests)
        classGroup.save()
        res.send(classGroup)
    }catch (e) {
        res.status(400).send(e)
    }
})
router.post('/classGroups/acceptRequest/:id', async (req,res)=>{
    try{
        let classGroup=await ClassGroup.findById(req.params.id)
        classGroup=await classGroup.addMember(req.body.userId,req.body.username)
        classGroup.requests = await classGroup.requests.filter((request) => {

            return request.userId !== req.body.userId
        })
        console.log(classGroup.requests)
        classGroup.save()
        res.send(classGroup)
    }catch (e) {
        res.send(e)
    }
})
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
