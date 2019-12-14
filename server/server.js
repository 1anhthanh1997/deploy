const express = require('express')
require('./db/mongoose')
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
// let cors = require('cors')
const app = express()
const port = process.env.PORT

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
app.use(express.static('public'));
app.use(express.json())
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
// app.use(cors({
//     origin:['http://localhost:3000','http://127.0.0.1:4200'],
//     credentials:true
// }));
// app.use(function (req, res, next) {
//
//     res.header('Access-Control-Allow-Origin', "http://localhost:4200");
//     res.header('Access-Control-Allow-Headers', true);
//     res.header('Access-Control-Allow-Credentials', true);
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
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
app.listen(port, () => {
    console.log('Started on port 5000');
});
// module.exports = {app};
