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

function translateTitles (data) {
    for (const key in data) {
        const translatedTitle = fieldTranslations[data[key].column_name]
        if (translatedTitle) {
            data[key].column_name = translatedTitle
        }
    }
    return data.map(item => item.column_name)
}

module.exports = {
    transateRows,
    translateTitles
}
