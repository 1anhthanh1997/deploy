const express = require('express')
const mongoose=require('mongoose')

const multer=require('multer')
const {Document} = require("../models/document")
const router = express.Router()
const conn = mongoose.createConnection(process.env.MONGODB_URL);
let GridFsStorage = require('multer-gridfs-storage');
let Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
let gfs;
let filename;
conn.once('open', () => {
    // Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
    url: process.env.MONGODB_URL,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
             filename = file.originalname;
            const fileInfo = {
                filename: filename,
                bucketName: 'uploads'
            };
            resolve(fileInfo);
        });
    }
});

// Multer configuration for single file uploads
let upload = multer({
    storage: storage
})
router.post('/documents/documentFile', upload.single('document'), async (req, res) => {
   res.send(filename)
})

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
