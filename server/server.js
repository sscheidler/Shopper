import config from './../config/config'
import app from './express'
import mongoose from 'mongoose'

require('dotenv').config();


const uri = process.env.MONGODB_URI;
//const uri = "mongodb://localhost:27017/shopperDB"
//mongoose.connect("mongodb://localhost:27017/shopperDB");

//config.mongoUri,
// Connection URL
mongoose.Promise = global.Promise
mongoose.connect(uri,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${mongoUri}`)
})

//console.log(config.mongoUri);

app.listen(config.port, (err) => {
    if (err) {
        console.log(err)
    }
    console.info('Server started on port %s.', config.port)
})
