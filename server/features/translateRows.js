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
    return data
        .map((item) => item.column_name)
        .filter(item => fieldTranslations[item])
        .map(item => fieldTranslations[item])
}

module.exports = {
    transateRows,
    translateTitles
}
