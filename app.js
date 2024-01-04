const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const chalk = require('chalk')
const cors = require('cors')
const initDatabase = require('./startUp/initDatabase')
const routes = require('./routes')

const app = express()

const corsOptions = {
    // origin: ['*', 'http://127.0.0.1:3000/', 'http://localhost:3000/', 'http://localhost:3000', 'localhost:3000'],
    // credentials:true,            //access-control-allow-credentials:true
    // optionSuccessStatus:200,
    // "origin": "*",
    // "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    // "preflightContinue": true,
    // "optionsSuccessStatus": 204
}

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api', routes)
// app.use(cors(corsOptions))
app.use(cors())

const PORT = config.get('port') ?? 8008

// if (process.env.NODE_ENV === 'production') {
//     console.log('production')
// } else {
//     console.log('development')
// }

async function start() {
    try {
        mongoose.connection.once('open', () => {
            initDatabase()
        })
        await mongoose.connect(config.get('mongoUri'))
        console.log(chalk.green("MongoDB connected."))
        app.listen(8080, () =>
                console.log(chalk.green(`Server has been started on port ${PORT}`))
            // console.log(`Server has been started on port ${PORT}`)
        )
    } catch (e) {
        console.log(chalk.red(e.message))
        process.exit(1)
    }
}

start()
