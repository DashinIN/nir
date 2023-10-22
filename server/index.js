const { allTableQuery, allTableTitlesQuery, getRequestQuery } = require('./consts/query')
const { transateRows, translateTitles } = require('./features/translateRows')
const express = require('express')
const { Pool } = require('pg')
const bodyParser = require('body-parser')
const cors = require('cors')
const { fieldTranslations } = require('./consts/translations')

const app = express()
app.use(bodyParser.json())
app.use(cors())
const port = 5000

const pool = new Pool({
    user: 'postgres',
    password: '123456',
    host: 'localhost',
    database: 'reestr',
    port: 5432
})

app.get('/getAll', async (req, res) => {
    try {
        const { rows } = await pool.query(allTableQuery)
        const translatedData = transateRows(rows)
        res.json(translatedData)
    } catch (error) {
        res.status(500).send('Ошибка сервера')
    }
})

app.get('/getAllTitles', async (req, res) => {
    try {
        const { rows } = await pool.query(allTableTitlesQuery)
        const filteredRows = rows
            .map((item) => item.column_name)
            .filter(item => fieldTranslations[item])
        const translatedData = translateTitles(filteredRows)
        res.json(translatedData)
    } catch (error) {
        res.status(500).send('Ошибка сервера')
    }
})

app.post('/postOrder', async (req, res) => {
    const items = req.body
    const translatedArray = items
        .map(item => Object.keys(fieldTranslations)
            .find(key => fieldTranslations[key] === item)
        )
    const requestQuery = getRequestQuery(translatedArray)
    try {
        const { rows } = await pool.query(requestQuery)
        const translatedData = transateRows(rows)
        res.json(translatedData)
    } catch (error) {
        res.status(500).send('Ошибка сервера')
    }
})

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`)
})
