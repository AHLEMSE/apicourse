import express from 'express'
import requestLogger from './middlewares/requestLogger.js';
import dotenv from 'dotenv';
import api from './api/index.js';
import CONFIG from './config.json' assert {type: 'json'}
import mongoose from 'mongoose'
import swagger from './api/swagger.js';

dotenv.config()
const PORT = CONFIG.port || 7000
const app = express();
//connect to Database///////////////////////////////////////////////////////////////////////////////////////
mongoose.connect(CONFIG.mongo_url)
    .then((db) => {
        app.use(express.json())
        app.use(requestLogger)
        app.use('/api', api({ config: CONFIG, db }))

        app.set('view engine','pug')
        app.set('views','./views')
        app.use('/api-docs', swagger({ config: CONFIG, db }))
        app.listen(
            PORT,
            () => console.log(`SERVER IS RUNNIN IN ${PORT}`)
        )
    })
    .catch((err) => { console.log(err, "Received an Error") })