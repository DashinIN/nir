const { fieldTranslations } = require('../consts/translations.js')

const transateTableTitles = (data) => {
    return data.map(row => {
        const translatedRow = {}
        for (const key in row.dataValues) {
            if (fieldTranslations[key]) {
                translatedRow[fieldTranslations[key]] = row[key]
            } else {
                translatedRow[key] = row[key]
            }
        }
        return translatedRow
    })
}

const translateTitlesRU = (items) => {
    return items.map(item => fieldTranslations[item])
}

const translateTitlesEN = (items) => {
    return items.map(item => Object.keys(fieldTranslations)
        .find(key => fieldTranslations[key] === item)
    )
}

module.exports = {
    transateTableTitles,
    translateTitlesRU,
    translateTitlesEN
}
