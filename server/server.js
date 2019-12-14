const express = require('express')
require('./db/mongoose')
const bodyParser=require('body-parser')
const userRouter = require('./routers/user')
const courseRouter=require('./routers/course')
const documentRouter=require('./routers/document')
const homeworkRouter=require('./routers/hơmework')
const classGroupRouter=require('./routers/classGroup')
const lectureRouter=require('./routers/lecture')
const questionRouter=require("./routers/question")
const reviewRouter=require('./routers/review')
const testRouter=require('./routers/test')
const featuredCourseRouter=require('./routers/featuredCourse')
const topicRouter=require('./routers/topic')
const slideRouter=require('./routers/slide')
const cors = require('cors')
const app = express()
const port = process.env.PORT
app.use(cors())
// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET requests are disabled')
//     } else {
//         next()
//     }
// })

// app.use((req, res, next) => {
//     res.status(503).send('Site is currently down. Check back soon!')
// })
// app.use(cors)
// app.use(express.static('public'));
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));

app.use(userRouter)
app.use(courseRouter)
app.use(documentRouter)
app.use(homeworkRouter)
app.use(classGroupRouter)
app.use(lectureRouter)
app.use(questionRouter)
app.use(reviewRouter)
app.use(testRouter)
app.use(featuredCourseRouter)
app.use(topicRouter)
app.use(slideRouter)
// app.use(cors())
// app.use(function (req, res, next) {
//     /*var err = new Error('Not Found');
//      err.status = 404;
//      next(err);*/
//
//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', '*');
//
//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//
//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
//
// //  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//
//     // Pass to next layer of middleware
//     next();
// });
//Register
// {
//     "username":"1anhthanh1997",
//     "password":"Anhthanh@1997",
//     "name":"Nguyễn Chí Thanh",
//     "address":"Hà Nội",
//     "phoneNumber":"0988950215",
//     "email":"3anhthanh1997",
//     "class":"10A8",
//     "permission":"user"
// }

//Course
// app.get()
app.get('/hello',(req,res)=>{
    res.send("Hello")
})
app.listen(port, () => {
    console.log('Started on port 5000');
});
// module.exports = {app};
