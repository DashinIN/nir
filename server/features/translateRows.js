const { fieldTranslations } = require('../consts/translations.js')

const transateRows = (data) => {
    return data.map(row => {
        const translatedRow = {}
        for (const key in row) {
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
    transateRows,
    translateTitlesRU,
    translateTitlesEN
}
