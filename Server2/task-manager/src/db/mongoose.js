var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
let DB_CONECTION= 'mongodb+srv://root:anhthanh1997@cluster0-umvy9.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true },
    () => { console.log('connected to db') }
)
// mongoose.connect('mongodb://localhost:27017/onlineTeaching',{
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false
// });

module.exports = {mongoose};
