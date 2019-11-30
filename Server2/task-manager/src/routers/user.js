const express = require('express')
const {User} = require('../models/user')

const bcript = require('mongoose-bcrypt')
const router = express.Router()
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
router.post('/users', (req, res) => {
    console.log(req.body);
    var user = new User({
        // _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        class: req.body.class,
        permission: req.body.permission
    });

    user.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });

});
router.get('/users', (req, res) => {
    User.find().then((users) => {
        res.send({users});
    }, (e) => {
        res.status(400).send(e);
    })
})
router.post('/users/login', (req, res) => {
    User.findOne({username: req.body.username}).then((user) => {
        if (!user) {
            throw new Error('Unable to login')
        }
        const isMatch = bcript.compare(req.body.password, user.password)
        if (!isMatch) throw new Error('Unable to login')
        res.send(user)
    }, (e) => {
        res.status(400).send(e);
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


})

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
router.patch('/users/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['email']);
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    User.findByIdAndUpdate(id, {$set: body}, {new: true}).then((user) => {
        if (!user) {
            return res.status(404).send();
        }
        res.send(user)
    }).catch((e) => {
        return res.status(400).send();
    })
})
router.delete('/users/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    User.findByIdAndRemove(id).then((user) => {
        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    }).catch((e) => {
        res.status(400).send();
    });
});
module.exports=router
