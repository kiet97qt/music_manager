const express = require('express');
const cors = require('cors')
require('dotenv')
const bodyParser = require('body-parser')
require('./connections/mongodb');
const app = express();
const routes = require('./routes')
const multer = require('multer');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000
//swagger 
var swaggerUi = require('swagger-ui-express')
var fs = require('fs')
var jsyaml = require('js-yaml');
var spec = fs.readFileSync('swagger.yaml', 'utf8');
var swaggerDocument = jsyaml.safeLoad(spec);
const logger = require('./winston');
//multer

// SET STORAGE
//const upload = multer({ dest: './public/musicFile' })
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/musicFile')
    },
    filename: function (req, file, cb) {
      cb(null, `${file.originalname}`)
    }
  })
   
var upload = multer({ storage: storage })

app.use(express.static('public'))

app.use(cors())
app.use('/',routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.post('/uploads', upload.single('mp3'), function (req, res) {
  logger.info('Uploads file successfully')
});
 
app.listen(PORT, () => {
  logger.info(`Example app listening at http://localhost:${PORT}`)
});

module.exports = app;

