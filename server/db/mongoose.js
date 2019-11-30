var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(MONGODB_URL,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,

});

module.exports = {mongoose};
