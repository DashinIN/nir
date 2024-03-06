const { Orgs, Regions, Fedokrug, OutputSamplesFields } = require('../models')
const { Op } = require('sequelize') // добавлено Sequelize
const { transateTableTitles, translateTitlesRU } = require('../features/translateRows')
const { fieldWidth } = require('../consts/width')

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
            const fedokrugs = await Fedokrug.findAll({ attributes: ['id_fedokrug'] })

            // Извлечение значений из результатов запросов
            const levelValues = uniqueLevel.map(item => item.DISTINCT)
            const statusEgrulValues = uniqueStatusEgrul.map(item => item.DISTINCT)
            const orgTypeValues = uniqueOrgType.map(item => item.DISTINCT)
            const fedokrugValues = fedokrugs.map(item => item.id_fedokrug)

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

    async getSampleFieldsHeaders (req, res) {
        try {
            const selectedSampleId = req.body.selectedSampleId
            // Получаем все поля для выбранного шаблона
            const fields = await OutputSamplesFields.findAll({
                where: { sample_id: selectedSampleId },
                order: [['field_order', 'ASC']]
            })

            // Преобразуем полученные поля в формат заголовков для таблицы Ant Design
            const headers = [{
                title: 'id', // Заголовок на русском языке
                dataIndex: 'id', // Идентификатор данных (название поля на английском языке)
                key: 'id', // Уникальный ключ
                width: fieldWidth.id
            }, ...fields.map(field => ({
                title: field.field_name_ru, // Заголовок на русском языке
                dataIndex: field.field_name_en, // Идентификатор данных (название поля на английском языке)
                key: field.field_name_en, // Уникальный ключ
                width: fieldWidth[field.field_name_en]
            }))]
            return res.json(headers)
        } catch (error) {
            console.error('Ошибка:', error)
            throw new Error('Произошла ошибка при получении заголовков полей шаблона')
        }
    }

    async getFilteredOrgs (req, res) {
        try {
            const page = req.body.currentPage || 1 // Значение страницы по умолчанию
            const pageSize = req.body.pageSize || 1000 // Размер страницы по умолчанию

            // Вычисляем смещение на основе номера страницы и размера страницы
            const offset = (page - 1) * pageSize

            const selectedSampleId = req.body.selectedSampleId
            // Получаем все поля для выбранного шаблона
            const fields = await OutputSamplesFields.findAll({
                where: { sample_id: selectedSampleId },
                order: [['field_order', 'ASC']]
            })

            // Преобразуем полученные поля в формат заголовков для таблицы Ant Design
            const attributes = ['id', ...fields.map(field => field.field_name_en)]

            const filters = req.body.filters
            const filterObject = {}

            const sortField = req.body.sortField // Поле для сортировки
            const sortOrder = req.body.sortOrder

            let order = []
            if (sortField && sortOrder !== 0) {
                order = [[sortField, sortOrder === 1 ? 'ASC' : 'DESC']]
            }

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
                const fedOkrugIds = filters.fedOkrug
                const regionsInFedOkrug = await Regions.findAll({ where: { id_fedokrug: fedOkrugIds } })
                const regionIds = regionsInFedOkrug.map(region => region.id_region)
                filterObject.id_region = { [Op.in]: regionIds }
            }
            console.log(filterObject)

            const orgs = await Orgs.findAll({
                where: filterObject,
                attributes,
                offset, // Смещение
                limit: pageSize, // Лимит записей на странице
                order
            })

            return res.json(orgs)
        } catch (error) {
            console.error('Ошибка:', error)
            return res.status(500).json({ error: 'Ошибка при получении организаций с учетом фильтров' })
        }
    }

    async getFilteredOrgsCount (req, res) {
        try {
            const filters = req.body.filters
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
                const fedOkrugIds = filters.fedOkrug
                const regionsInFedOkrug = await Regions.findAll({ where: { id_fedokrug: fedOkrugIds } })
                const regionIds = regionsInFedOkrug.map(region => region.id_region)
                filterObject.id_region = { [Op.in]: regionIds }
            }
            console.log(filterObject)

            const totalCount = await Orgs.count({ where: filterObject })
            return res.json({ totalCount })
        } catch (error) {
            console.error('Ошибка:', error)
            return res.status(500).json({ error: 'Ошибка при получении количества организаций с учетом фильтров' })
        }
    }
}

module.exports = new OrgsController()
