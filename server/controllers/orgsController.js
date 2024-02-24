const { Orgs, Regions } = require('../models')
const { transateTableTitles, translateTitlesRU } = require('../features/translateRows')

class OrgsController {
    async getAll (req, res) {
        const orgs = await Orgs.findAll({
            limit: 100
        })
        const translatedData = transateTableTitles(orgs)
        return res.json(translatedData)
    }

    async getAllTitles (req, res) {
        try {
            const orgsFields = Object.keys(Orgs.tableAttributes).filter(field => field !== 'id')
            const translatedFields = translateTitlesRU(orgsFields)
            res.json(translatedFields)
        } catch (error) {
            console.error('Ошибка:', error)
            res.status(500).json({ error: 'Произошла ошибка при получении заголовков таблицы Orgs' })
        }
    }

    async getByRegion (req, res) {
        try {
            const regionName = req.body.regionName
            const region = await Regions.findOne({ where: { name_region: regionName } })
            if (!region) return res.status(404).json({ error: 'Регион не найден' })
            const regionId = region.id_region
            const orgs = await Orgs.findAll({ where: { id_region: regionId } })
            return res.json(orgs)
        } catch (error) {
            return res.status(500).json({ error: 'Ошибка при получении организаций по региону' })
        }
    }
}

module.exports = new OrgsController()
