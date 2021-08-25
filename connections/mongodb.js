const mongoose = require('mongoose');
const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
mongoose.connect('mongodb://localhost:27017/music-manager', opts);

mongoose.connection.once('open', function () {
    console.log('connect success!')
}).on('error', function(err) {
    console.log('err: ', err)
})