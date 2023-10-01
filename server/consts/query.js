 const query = `
        SELECT l.*, pl.name as gol_name, pl.id_region as gol_id_region, pl.okved as okved_g,
          (select name from okveds where idlistedu = l.id_parent and kind=1) as okvedname
        FROM lorgs l
        LEFT JOIN lorgs pl ON pl.idlistedu = l.id_parent
        ORDER BY id_parent, id_level, name
      `;

      module.exports = {
        query: query
      };