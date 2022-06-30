require('dotenv').config();
const mongoose = require('mongoose');

var mongoDB = process.env.DB_KEY;
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));