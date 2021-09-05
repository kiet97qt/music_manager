const mongoose = require('mongoose');
const logger = require('../winston');

require('dotenv')
const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}

switch (process.env.NODE_ENV) {
    case 'development':
        logger.info("NODE_ENV = development")
        mongoose.connect('mongodb://localhost:27017/music-manager', opts);
        break;
    case 'test':
        logger.info("NODE_ENV = test")
        mongoose.connect('mongodb://localhost:27017/music-manager-test', opts);
        break;
    case 'production':
        logger.info("NODE_ENV = production")
        mongoose.connect('mongodb://some-mongo:27017/music-manager', opts);
        break;
    default:
        logger.info("NODE_ENV = development")
        mongoose.connect('mongodb://localhost:27017/music-manager', opts);
        break;
}


mongoose.connection.once('open', function () {
    logger.info("Connect success!")
}).on('error', function(err) {
    logger.error(new Error('Connect fail'))
})