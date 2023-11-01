// Исходный запрос
const allTableQuery = `
  SELECT 
  l.*, 
  pl.name as gol_name,
  pl.id_region as gol_id_region, 
  pl.okved as okved_g,
    (
    SELECT name 
    FROM okveds 
    WHERE idlistedu = l.id_parent AND kind = 1
    ) AS okvedname
  FROM lorgs l
  LEFT JOIN lorgs pl ON pl.idlistedu = l.id_parent
  ORDER BY id_parent, id_level, name
  `

// Запрос на основе исходного для получения названий полей
const allTableTitlesQuery = `
  WITH my_view AS (${allTableQuery})
  SELECT column_name
  FROM information_schema.columns
  WHERE table_name = 'my_view'
  `

// Запрос на получение данных выбранных полей в выбранном порядке
const getRequestQuery = (selectedFields) => {
    // Массив выбранных полей объединяется в строку через запятую
    const selectedFieldsString = selectedFields.join(', ')
    // На основе исходного запроса выбираю нужные поля
    const query = `
    WITH my_view AS (${allTableQuery})
      SELECT ${selectedFieldsString}
      FROM my_view
  `
    return query
}

module.exports = {
    allTableQuery,
    allTableTitlesQuery,
    getRequestQuery
}
