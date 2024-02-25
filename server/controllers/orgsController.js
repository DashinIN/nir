const { Orgs, Regions, Fedokrug } = require('../models')
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

    async getUniqueValues (req, res) {
        try {
            const uniqueLevel = await Orgs.aggregate('id_level', 'DISTINCT', { plain: false })
            const uniqueStatusEgrul = await Orgs.aggregate('status_egrul', 'DISTINCT', { plain: false })
            const uniqueOrgType = await Orgs.aggregate('org_type', 'DISTINCT', { plain: false })

            const levelValues = uniqueLevel.map(item => item.DISTINCT)
            const StatusEgrulValues = uniqueStatusEgrul.map(item => item.DISTINCT)
            const OrgTypeValues = uniqueOrgType.map(item => item.DISTINCT)

            const fedokrugNames = await Fedokrug.findAll({ attributes: ['name_fedokrug'] })
            const regionNames = await Regions.findAll({ attributes: ['name_region'] })

            const fedokrugValues = fedokrugNames.map(item => item.name_fedokrug)
            const regionValues = regionNames.map(item => item.name_region)

            return res.json({
                levelValues,
                StatusEgrulValues,
                OrgTypeValues,
                fedokrugValues,
                regionValues
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: 'Ошибка при получении уникальных значений полей' })
        }
    }
}

module.exports = new OrgsController()
