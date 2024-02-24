require('dotenv').config()
const sequelize = require('./db')
const cors = require('cors')
const router = require('./routes')
const express = require('express')

const PORT = process.env.PORT || 5000
const app = express()
app.use(express.json())
app.use(cors())
app.use('/api', router)

// app.post('/getSelectedSampleData', async (req, res) => {
//     const titles = req.body
//     console.log(titles)
//     const translatedTitles = translateTitlesEN(titles)
//     const requestQuery = selectedFieldsQuery(translatedTitles)
//     try {
//         const { rows } = await pool.query(requestQuery)
//         const translatedData = transateRows(rows)
//         res.json(translatedData)
//     } catch (error) {
//         res.status(500).send('Ошибка сервера')
//     }
// })

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
