const mongoose = require('mongoose');
require('dotenv')
const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}

switch (process.env.NODE_ENV) {
    case 'development':
        console.log("NODE_ENV = development")
        mongoose.connect('mongodb://localhost:27017/music-manager', opts);
        break;
    case 'test':
        console.log("NODE_ENV = test")
        mongoose.connect('mongodb://localhost:27017/music-manager-test', opts);
        break;
    case 'production':
        console.log("NODE_ENV = production")
        mongoose.connect('mongodb://some-mongo:27017/music-manager', opts);
        break;
    default:
        console.log("NODE_ENV = development")
        mongoose.connect('mongodb://localhost:27017/music-manager', opts);
        break;
}


mongoose.connection.once('open', function () {
    console.log('connect success!')
}).on('error', function(err) {
    console.log('err: ', err)
})