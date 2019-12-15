const express = require('express')
const {Slide} = require("../models/slider")
const sharp=require('sharp')
const multer=require('multer')
const router = express.Router()
const upload = multer({
    limits: {
        fileSize: 10000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
    }
})
router.post('/slides', upload.single('image'), async (req, res) => {
    const buffer= await sharp(req.file.buffer).resize({height:250,width:250}).png().toBuffer()
    let slide= new Slide({
        image:buffer
    })
    try{
        await slide.save()
        res.status(200).send(slide)
    }catch(e){
        res.status(400).send(e)
    }
})
router.get('/slide', async (req, res) => {
    // res.send(req.user)
    try{
        let slide=await Slide.find();
        res.status(200).send(slide)
    }catch (e) {
        res.status(400).send(e)
    }
    const slide=await Slide.find();
    // Slide.find().then((slides) => {
    //     res.send({slides});
    // }, (e) => {
    //     res.status(400).send(e);
    // })
})
router.delete('/slide/:id', async (req, res) => {
    // res.send(req.user)
    try{
        let slide=await Slide.findByIdAndRemove(req.params.id);
        res.status(200).send(slide)
    }catch (e) {
        res.status(400).send(e)
    }
    const slide=await Slide.find();
    // Slide.find().then((slides) => {
    //     res.send({slides});
    // }, (e) => {
    //     res.status(400).send(e);
    // })
})
module.exports = router
