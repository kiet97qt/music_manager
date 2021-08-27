const express = require('express');
const cors = require('cors')
require('dotenv')
const bodyParser = require('body-parser')
require('./connections/mongodb');
const app = express();
const routes = require('./routes')
app.use(bodyParser.json());
const PORT = process.env.PORT || 3001
//swagger 
var swaggerUi = require('swagger-ui-express')
var fs = require('fs')
var jsyaml = require('js-yaml');
var spec = fs.readFileSync('swagger.yaml', 'utf8');
var swaggerDocument = jsyaml.safeLoad(spec);

app.use(cors())
app.use('/',routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});

module.exports = app;
