require('dotenv').config()
const sequelize = require('./db')
const cors = require('cors')
const router = require('./routes')
const express = require('express')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const PORT = process.env.PORT || 5000
const app = express()
app.use(express.json())
app.use(cors())
app.use('/api', router)

app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`server start on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()
