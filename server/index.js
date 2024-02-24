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

// app.post('/addSample', async (req, res) => {
//     try {
//         const { name, items } = req.body

//         console.log(name, items)
//         const titlesRU = items
//         const titlesEN = translateTitlesEN(items)
//         const insertSampleNameQuery = 'INSERT INTO output_samples (sample_name) VALUES ($1) RETURNING sample_id'
//         const sampleName = [name]
//         const sampleResult = await pool.query(insertSampleNameQuery, sampleName)

//         const sampleId = sampleResult.rows[0].sample_id

//         const insertSampleFieldsQuery = 'INSERT INTO output_samples_fields (sample_id, field_name_en, field_name_ru, field_order) VALUES ($1, $2, $3, $4)'
//         const sampleFieldsValues = titlesEN.map((item, index) => [sampleId, item, titlesRU[index], index + 1])

//         await Promise.all(sampleFieldsValues.map(async (values) => {
//             await pool.query(insertSampleFieldsQuery, values)
//         }))

//         res.status(201).json({ message: 'Шаблон успешно добавлен' })
//     } catch (error) {
//         console.error(error)
//         if (error.code === '23505') {
//             res.status(400).json({ error: 'Шаблон с таким именем уже существует. Выберете другое название шаблона' })
//         } else {
//             res.status(500).json({ error: 'Произошла ошибка при добавлении шаблона' })
//         }
//     }
// })

// app.get('/getAllSamples', async (req, res) => {
//     try {
//         const query = 'SELECT * FROM output_samples'
//         const { rows: samples } = await pool.query(query)
//         // Получаю данные о шаблонах в формате sample_id:, sample_name:
//         const result = await Promise.all(samples.map(async (sample) => {
//             const sampleId = [sample.sample_id]
//             const fieldsQuery = 'SELECT field_name_en FROM output_samples_fields WHERE sample_id = $1 ORDER BY field_order'
//             // Получаю поля в порядке их очереди для определенного шаблона
//             const { rows: sampleFields } = await pool.query(fieldsQuery, sampleId)
//             console.log(sampleFields)
//             const fieldNames = sampleFields.map((field) => field.field_name_en)
//             // Поля добавляю массивом
//             return {
//                 ...sample,
//                 sample_content: translateTitlesRU(fieldNames)
//             }
//         }))
//         console.log(result)
//         res.status(200).json(result)
//     } catch (error) {
//         console.error('Ошибка:', error)
//         res.status(500).json({ error: 'Произошла ошибка при получении данных из таблицы sample' })
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
