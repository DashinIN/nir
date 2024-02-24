const { Orgs, Regions } = require('../models')
const { transateTableTitles } = require('../features/translateRows')

class OrgsController {
    async getAll (req, res) {
        const orgs = await Orgs.findAll({
            limit: 100
        })
        const translatedData = transateTableTitles(orgs)
        return res.json(translatedData)
    }

    async getByRegion (req, res) {
        try {
            const regionName = req.body.regionName
            const region = await Regions.findOne({
                where: { name_region: regionName }
            })
            if (!region) return res.status(404).json({ error: 'Регион не найден' })
            const regionId = region.id_region
            const orgs = await Orgs.findAll({
                where: { id_region: regionId },
                include: [{
                    model: Regions,
                    as: 'region',
                    where: { id_region: regionId }
                }]
            })
            return res.json(orgs)
        } catch (error) {
            return res.status(500).json({ error: 'Ошибка при получении организаций по региону' })
        }
    }
}

module.exports = new OrgsController()
