const express = require('express')
const {User} = require('../models/user')
var jwt = require('jsonwebtoken');
const bcript = require('bcrypt')
const router = express.Router()
const multer=require('multer')
const auth=require('../middleware/auth')
const sharp=require('sharp')
// const upload = multer({
//     dest: 'avatars'
// })
//
// router.post('/users/me/avatar', upload.single('avatar'), (req, res) => {
//     res.send()
// })

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
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer= await sharp(req.file.buffer).resize({height:250,width:250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})
router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/jpg')
        res.send(user.avatar)
    } catch (e) {
        res.status(404).send()
    }
})
router.post('/users', async (req, res) => {
    let user = new User(req.body)

    try {
        // console.log(req.body)
        await user.save()
        // console.log(user._id)
        // const token = jwt.sign({ _id: "1" }, 'thisismynewcourse')
        const token = await user.generateAuthToken()
        console.log(token)
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
    // console.log(req.body);
    // var user = new User({
    //     // _id: new mongoose.Types.ObjectId(),
    //     username: req.body.username,
    //     password: req.body.password,
    //     name: req.body.name,
    //     address: req.body.address,
    //     phoneNumber: req.body.phoneNumber,
    //     email: req.body.email,
    //     class: req.body.class,
    //     permission: req.body.permission
    // });
    //
    // user.save().then((doc) => {
    //     res.send(doc);
    // }, (e) => {
    //     res.status(400).send(e);
    // });

});
router.get('/users/me',auth, async (req, res) => {
    res.send(req.user)
    // User.find().then((users) => {
    //     res.send({users});
    // }, (e) => {
    //     res.status(400).send(e);
    // })
})
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.username, req.body.password)
        console.log(user)
        const token = await user.generateAuthToken()
        const publicUser=await user.getPublicInformation()
        console.log(publicUser)
        res.send({user:publicUser, token })
    } catch (e) {
        res.status(400).send(e)
    }

})
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send(req.user)
    } catch (e) {
        res.status(500).send(e)
    }
})
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})
// User.findOne({username: req.body.username}).then((user) => {
//     if (!user) {
//         throw new Error('Unable to login')
//     }
//     const isMatch = bcript.compare(password, user.password)
//     if (!isMatch) throw new Error('Unable to login')
//     res.send(user)
// }).catch((err) => {
//     res.send(err)
// })


// })

// app.get('/users/_id', (req, res) => {
//     console.log(req);
//     // let id=parseInt(parseInt(req.body._id))
//     User.findOne({_id: req.body._id}).then((doc) => {
//         // console.log(Object.keys(username).length === 0)
//         res.send(doc)
//     }).catch((err)=>{
//         res.send(err)
//     })
// })
router.patch('/users/changePass/:id', (req, res) => {
    var id = req.params.id;

    var body = req.body
    User.findById(id).then((user)=>{
        res.send(user)
    }).catch((e)=>console.log(e));

    // User.findOneAndUpdate({_id: id}, {$set: body}, {new: true}).then((user) => {
    //     if (!user) {
    //         return res.status(404).send();
    //     }
    //     res.send(user)
    // }).catch((e) => {
    //     return res.status(400).send();
    // })
})
router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'address', 'phoneNumber','email','class','permission']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

// router.patch('/users/:id', (req, res) => {
//     var id = req.params.id;
//
//     var body = req.body
//     User.findOneAndUpdate({_id: id}, {$set: body}, {new: true}).then((user) => {
//         if (!user) {
//             return res.status(404).send();
//         }
//         res.send(user)
//     }).catch((e) => {
//         return res.status(400).send();
//     })
//
// })

// router.delete('/users/:id', (req, res) => {
//     var id = req.params.id;
//
//     if (!ObjectID.isValid(id)) {
//         return res.status(404).send();
//     }
//
//     User.findByIdAndRemove(id).then((user) => {
//         if (!user) {
//             return res.status(404).send();
//         }
//
//         res.send(user);
//     }).catch((e) => {
//         res.status(400).send();
//     });
// });
router.delete('/users/:id',(req,res)=>{
    User.findByIdAndRemove(req.params.id).then((course)=>{
        if(!course) return res.status(404).send()
        res.send(course)
    })
})
module.exports = router
