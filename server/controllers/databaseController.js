require('dotenv').config()
const mongoose = require('mongoose')

// connect to database
CONNECTION_STRING = process.env.MONGO_URL

mongoose.connect(CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    })
    
const db = mongoose.connection
db.on('error', function (err) {
    console.log('Failed to connect to database');
    process.exit(1);
    });
db.once('open', function () {
    console.log("Connected to database");
});

module.exports = db
