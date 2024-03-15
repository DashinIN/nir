const { Orgs, Regions, Fedokrug, OutputSamplesFields } = require('../models')
const { Op } = require('sequelize') // добавлено Sequelize
const { translateTitlesRU } = require('../features/translateRows')
const { fieldWidth } = require('../consts/width')

async function applyFilters (filters) {
    const filterObject = {}
    if (filters.fedOkrug && filters.fedOkrug.length > 0 && (!filters.region || filters.region.length === 0)) {
        const fedOkrugIds = filters.fedOkrug
        const regionsInFedOkrug = await Regions.findAll({ where: { id_fedokrug: fedOkrugIds } })
        const regionIds = regionsInFedOkrug.map(region => region.id_region)
        filterObject.id_region = { [Op.in]: regionIds }
    }
    if (filters.region && filters.region.length > 0) {
        const regionNames = filters.region
        const regions = await Regions.findAll({ where: { name_region: regionNames } })
        const regionIds = regions.map(region => region.id_region)
        filterObject.id_region = { [Op.in]: regionIds }
    }
    if (filters.level && filters.level.length > 0) {
        filterObject.id_level = { [Op.in]: filters.level }
    }
    if (filters.statusEgrul && filters.statusEgrul.length > 0) {
        filterObject.status_egrul = { [Op.in]: filters.statusEgrul }
    }
    if (filters.orgType && filters.orgType.length > 0) {
        filterObject.org_type = { [Op.in]: filters.orgType }
    }
    filterObject.date_stop = null

    return filterObject
}

class OrgsController {
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

    async getFilterValues (req, res) {
        try {
            const regionQueryOptions = {}
            if (req.body.filters && req.body.filters.fedOkrug && req.body.filters.fedOkrug.length > 0) {
                regionQueryOptions.where = { id_fedokrug: req.body.filters.fedOkrug }
            }
            const regionNames = await Regions.findAll({
                attributes: ['name_region'],
                ...regionQueryOptions
            })
            const regionValues = regionNames.map(item => item.name_region)
            const uniqueLevel = await Orgs.aggregate('id_level', 'DISTINCT', { plain: false })
            const uniqueStatusEgrul = await Orgs.aggregate('status_egrul', 'DISTINCT', { plain: false })
            const uniqueOrgType = await Orgs.aggregate('org_type', 'DISTINCT', { plain: false })
            const fedokrugs = await Fedokrug.findAll({ attributes: ['id_fedokrug'] })
            const levelValues = uniqueLevel.map(item => item.DISTINCT)
            const statusEgrulValues = uniqueStatusEgrul.map(item => item.DISTINCT)
            const orgTypeValues = uniqueOrgType.map(item => item.DISTINCT)
            const fedokrugValues = fedokrugs.map(item => item.id_fedokrug)

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
            const fields = await OutputSamplesFields.findAll({
                where: { sample_id: selectedSampleId },
                order: [['field_order', 'ASC']]
            })

            const headers = [{
                title: 'id',
                dataIndex: 'id',
                key: 'id',
                width: fieldWidth.id
            }, ...fields.map(field => ({
                title: field.field_name_ru,
                dataIndex: field.field_name_en,
                key: field.field_name_en,
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
            const page = req.body.currentPage || 1
            const pageSize = req.body.pageSize || 1000
            const offset = (page - 1) * pageSize

            const selectedSampleId = req.body.selectedSampleId
            const fields = await OutputSamplesFields.findAll({
                where: { sample_id: selectedSampleId },
                order: [['field_order', 'ASC']]
            })
            const attributes = ['id', ...fields.map(field => field.field_name_en)]

            const sortField = req.body.sortField // Поле для сортировки
            const sortOrder = req.body.sortOrder
            let order = []
            if (sortField && sortOrder !== 0) {
                order = [[sortField, sortOrder === 1 ? 'ASC' : 'DESC']]
            }

            const filterObject = await applyFilters(req.body.filters)

            const orgs = await Orgs.findAll({
                where: filterObject,
                attributes,
                offset,
                limit: pageSize,
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
            const filterObject = await applyFilters(req.body.filters)
            const totalCount = await Orgs.count({ where: filterObject })
            return res.json({ totalCount })
        } catch (error) {
            console.error('Ошибка:', error)
            return res.status(500).json({ error: 'Ошибка при получении количества организаций с учетом фильтров' })
        }
    }

    async editOrgRecord (req, res) {
        try {
            const recordId = req.params.id
            const updatedData = req.body
            console.log('ЗАПРОС')
            console.log(recordId)
            console.log(updatedData)
            await Orgs.update(updatedData, { where: { id: recordId } })
            return res.status(200).json({ message: 'Запись успешно отредактирована' })
        } catch (error) {
            console.error('Ошибка:', error)
            return res.status(500).json({ error: 'Произошла ошибка при редактировании записи' })
        }
    }

    async deleteOrgRecord (req, res) {
        try {
            const recordId = req.params.id
            await Orgs.destroy({ where: { id: recordId } })
            return res.status(200).json({ message: 'Запись успешно удалена' })
        } catch (error) {
            console.error('Ошибка:', error)
            return res.status(500).json({ error: 'Произошла ошибка при удалении записи' })
        }
    }
}

module.exports = new OrgsController()
