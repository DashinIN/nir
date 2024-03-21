const { OutputSamples, OutputSamplesFields } = require('../models')
const { translateTitlesRU, translateTitlesEN } = require('../features/translateRows')

class SamplesController {
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

    async getSample (req, res) {
        const sampleId = req.params.id

        try {
            const sample = await OutputSamples.findByPk(sampleId)
            if (!sample) {
                return res.status(404).json({ error: 'Шаблон не найден' })
            }
            const sampleFields = await OutputSamplesFields.findAll({
                where: { sample_id: sampleId },
                order: [['field_order', 'ASC']]
            })
            const formattedFields = sampleFields.map(field => {
                return {
                    name: field.field_name_ru,
                    rights: field.rights
                }
            })

            return res.status(200).json({
                name: sample.sample_name,
                fields: formattedFields
            })
        } catch (error) {
            console.error('Ошибка:', error)
            return res.status(500).json({ error: 'Произошла ошибка при получении данных шаблона' })
        }
    }

    async addSample (req, res) {
        const { name, items } = req.body
        const titlesEN = translateTitlesEN(items.map(item => item.name))

        try {
            const newSample = await OutputSamples.create({
                sample_name: name
            })
            const sampleFieldsValues = items.map((item, index) => ({
                sample_id: newSample.sample_id,
                field_name_en: titlesEN[index],
                field_name_ru: item.name,
                field_order: index + 1,
                rights: item.rights
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

    async editSample (req, res) {
        const sampleId = req.params.id
        const { name, items } = req.body
        console.log(name, items)
        const titlesEN = translateTitlesEN(items.map(item => item.name))

        try {
            await OutputSamples.update(
                { sample_name: name },
                { where: { sample_id: sampleId } }
            )
            await OutputSamplesFields.destroy({ where: { sample_id: sampleId } })
            const sampleFieldsValues = items.map((item, index) => ({
                sample_id: sampleId,
                field_name_en: titlesEN[index],
                field_name_ru: item.name,
                field_order: index + 1,
                rights: item.rights
            }))
            await OutputSamplesFields.bulkCreate(sampleFieldsValues)
            return res.status(200).json({ message: `Шаблон ${name} успешно отредактирован` })
        } catch (error) {
            console.error('Ошибка:', error)
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({ error: 'Шаблон с таким именем уже существует. Выберите другое название шаблона' })
            }
            return res.status(500).json({ error: 'Произошла ошибка при редактировании шаблона' })
        }
    }

    async deleteSample (req, res) {
        const sampleId = req.params.id

        try {
            await OutputSamples.destroy({ where: { sample_id: sampleId } })
            return res.status(200).json({ message: 'Шаблон успешно удален' })
        } catch (error) {
            console.error('Ошибка:', error)
            return res.status(500).json({ error: 'Произошла ошибка при удалении шаблона' })
        }
    }
}

module.exports = new SamplesController()
