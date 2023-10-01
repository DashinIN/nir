const { fieldTranslations } = require('../consts/translations.js')

 const transateRows = (data) => {
    return data.map(row => {
            const translatedRow = {};
            for (let key in row) {
                if (fieldTranslations[key]) {
                    translatedRow[fieldTranslations[key]] = row[key];
                } else {
                    translatedRow[key] = row[key];
                }
            }
            return translatedRow;
        });
    }

    module.exports = {
        transateRows: transateRows
      };
