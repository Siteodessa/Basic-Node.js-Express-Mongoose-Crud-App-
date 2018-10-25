console.log('Starting...');
var fs = require('fs');
let express = require('../../node_modules/express') || require('../node_modules/express') || require('express');
let app = express();
const dbConfig = require('./db/config/database.config.js');
const mongoose = require('../../node_modules/mongoose');
var start_mongoose = require('./db/start_mongoose')(mongoose, dbConfig);
var core = require('./controllers/core');
core.app = app;
core.express = express;
require('./routes/')(core);
