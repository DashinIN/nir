const { OutputSamples, OutputSamplesFields } = require('../models')
const { translateTitlesRU, translateTitlesEN } = require('../features/translateRows')

class SamplesController {
    async addSample (req, res) {
        try {
            const { name, items } = req.body
            console.log(req.body)
            const newSample = await OutputSamples.create({
                sample_name: name
            })
            const titlesEN = translateTitlesEN(items.map(item => item.name))
            const sampleFieldsValues = items.map((item, index) => ({
                sample_id: newSample.sample_id,
                field_name_en: titlesEN[index],
                field_name_ru: item.name,
                field_order: index + 1,
                isEditable: Number(item.rights === 'USER')
            }))

            await OutputSamplesFields.bulkCreate(sampleFieldsValues)
            return res.status(201).json({ message: 'Шаблон успешно добавлен' })
        } catch (error) {
            console.log(error)
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({ error: 'Шаблон с таким именем уже существует. Выберите другое название шаблона' })
            } else {
                return res.status(500).json({ error: 'Произошла ошибка при добавлении шаблона' })
            }
        }
    }

    async getAllSamples (req, res) {
        try {
            const samples = await OutputSamples.findAll()

            const result = await Promise.all(samples.map(async (sample) => {
                const sampleFields = await OutputSamplesFields.findAll({
                    where: { sample_id: sample.sample_id },
                    order: [['field_order', 'ASC']]
                })

                const fieldNames = sampleFields.map((field) => field.field_name_en)

                return {
                    ...sample.toJSON(),
                    sample_content: translateTitlesRU(fieldNames)
                }
            }))

            res.status(200).json(result)
        } catch (error) {
            console.error('Ошибка:', error)
            res.status(500).json({ error: 'Произошла ошибка при получении данных из таблицы sample' })
        }
    }
}

module.exports = new SamplesController()
