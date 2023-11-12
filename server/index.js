const { allTableQuery, allTableTitlesQuery, selectedFieldsQuery } = require('./consts/query')
const { transateRows, translateTitlesRU, translateTitlesEN } = require('./features/translateRows')
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
        const translatedData = translateTitlesRU(filteredRows)
        res.json(translatedData)
    } catch (error) {
        res.status(500).send('Ошибка сервера')
    }
})

app.post('/getSelectedData', async (req, res) => {
    const titles = req.body
    const translatedTitles = translateTitlesEN(titles)
    const requestQuery = selectedFieldsQuery(translatedTitles)
    try {
        const { rows } = await pool.query(requestQuery)
        const translatedData = transateRows(rows)
        res.json(translatedData)
    } catch (error) {
        res.status(500).send('Ошибка сервера')
    }
})

app.post('/addSample', async (req, res) => {
    try {
        const { name, items } = req.body
        const titlesEN = translateTitlesEN(items)
        const insertSampleNameQuery = 'INSERT INTO output_samples (sample_name) VALUES ($1) RETURNING sample_id'
        const sampleName = [name]
        const sampleResult = await pool.query(insertSampleNameQuery, sampleName)

        const sampleId = sampleResult.rows[0].sample_id

        const insertSampleFieldsQuery = 'INSERT INTO output_samples_fields (sample_id, field_name, field_order) VALUES ($1, $2, $3)'
        const sampleFieldsValues = titlesEN.map((item, index) => [sampleId, item, index + 1])

        await Promise.all(sampleFieldsValues.map(async (values) => {
            await pool.query(insertSampleFieldsQuery, values)
        }))

        res.status(201).json({ message: 'Шаблон успешно добавлен' })
    } catch (error) {
        console.error('Ошибка:', error)
        res.status(500).json({ error: 'Произошла ошибка при добавлении шаблона' })
    }
})

app.get('/getAllSamples', async (req, res) => {
    try {
        const query = 'SELECT * FROM output_samples'
        const { rows: samples } = await pool.query(query)
        // Получаю данные о шаблонах в формате sample_id:, sample_name:
        const result = await Promise.all(samples.map(async (sample) => {
            const sampleId = [sample.sample_id]
            const fieldsQuery = 'SELECT field_name FROM output_samples_fields WHERE sample_id = $1 ORDER BY field_order'
            // Получаю поля в порядке их очереди для определенного шаблона
            const { rows: sampleFields } = await pool.query(fieldsQuery, sampleId)
            const fieldNames = sampleFields.map((field) => field.field_name)
            // Поля добавляю массивом
            return {
                ...sample,
                sample_content: translateTitlesRU(fieldNames)
            }
        }))
        console.log(result)
        res.status(200).json(result)
    } catch (error) {
        console.error('Ошибка:', error)
        res.status(500).json({ error: 'Произошла ошибка при получении данных из таблицы sample' })
    }
})

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`)
})
