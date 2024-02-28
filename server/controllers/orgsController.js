const { Orgs, Regions, Fedokrug } = require('../models')
const { Op } = require('sequelize') // добавлено Sequelize
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

    async getFilterValues (req, res) {
        try {
            const regionQueryOptions = {}

            // Если фильтр fedOkrug присутствует и не пустой массив,
            // добавляем его в опции запроса регионов
            if (req.body.filters && req.body.filters.fedOkrug && req.body.filters.fedOkrug.length > 0) {
                regionQueryOptions.where = { id_fedokrug: req.body.filters.fedOkrug }
            }

            // Запрос всех регионов с учетом опций фильтрации
            const regionNames = await Regions.findAll({
                attributes: ['name_region'],
                ...regionQueryOptions // Добавляем опции запроса
            })

            // Маппинг регионов в их имена
            const regionValues = regionNames.map(item => item.name_region)

            // Запрос уникальных значений для всех остальных полей
            const uniqueLevel = await Orgs.aggregate('id_level', 'DISTINCT', { plain: false })
            const uniqueStatusEgrul = await Orgs.aggregate('status_egrul', 'DISTINCT', { plain: false })
            const uniqueOrgType = await Orgs.aggregate('org_type', 'DISTINCT', { plain: false })
            const fedokrugs = await Fedokrug.findAll({ attributes: ['name_fedokrug'] })

            // Извлечение значений из результатов запросов
            const levelValues = uniqueLevel.map(item => item.DISTINCT)
            const statusEgrulValues = uniqueStatusEgrul.map(item => item.DISTINCT)
            const orgTypeValues = uniqueOrgType.map(item => item.DISTINCT)
            const fedokrugValues = fedokrugs.map(item => item.name_fedokrug)

            // Возврат данных в формате JSON
            return res.json({
                levelValues,
                statusEgrulValues,
                orgTypeValues,
                fedokrugValues,
                regionValues
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: 'Ошибка при получении уникальных значений полей' })
        }
    }

    async getFilteredOrgs (req, res) {
        try {
            const filters = req.body.filters
            console.log(filters)

            const filterObject = {}

            // Пример фильтрации по региону
            if (filters.region && filters.region.length > 0) {
                const regionNames = filters.region
                const regions = await Regions.findAll({ where: { name_region: regionNames } })
                const regionIds = regions.map(region => region.id_region)
                filterObject.id_region = { [Op.in]: regionIds }
            }

            // Пример фильтрации по уровню
            if (filters.level && filters.level.length > 0) {
                filterObject.id_level = { [Op.in]: filters.level }
            }

            // Пример фильтрации по статусу ЕГРЮЛ
            if (filters.statusEgrul && filters.statusEgrul.length > 0) {
                filterObject.status_egrul = { [Op.in]: filters.statusEgrul }
            }

            // Пример фильтрации по типу организации
            if (filters.orgType && filters.orgType.length > 0) {
                filterObject.org_type = { [Op.in]: filters.orgType }
            }

            // Пример фильтрации по федеральному округу
            if (filters.fedOkrug && filters.fedOkrug.length > 0) {
                const fedOkrugNames = filters.fedOkrug
                const fedOkrugs = await Fedokrug.findAll({ where: { name_fedokrug: fedOkrugNames } })
                const fedOkrugIds = fedOkrugs.map(fedOkrug => fedOkrug.id_fedokrug)
                const regionsInFedOkrug = await Regions.findAll({ where: { id_fedokrug: fedOkrugIds } })
                const regionIds = regionsInFedOkrug.map(region => region.id_region)
                filterObject.id_region = { [Op.in]: regionIds }
            }
            console.log(filterObject)

            const orgs = await Orgs.findAll({ where: filterObject })
            return res.json(orgs)
        } catch (error) {
            console.error('Ошибка:', error)
            return res.status(500).json({ error: 'Ошибка при получении организаций с учетом фильтров' })
        }
    }
}

module.exports = new OrgsController()
