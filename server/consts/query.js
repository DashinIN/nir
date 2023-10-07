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
      `;

      const allTableOneRowQuery = `
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
      LIMIT 1
    `;

module.exports = {
  allTableQuery: allTableQuery,
  allTableOneRowQuery: allTableOneRowQuery,
};