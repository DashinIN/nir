const { query } = require('./consts/query')
const { transateRows } = require('./features/translateRows')
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 5000;

const pool = new Pool({
  user: 'postgres',
  password: '123456',
  host: 'localhost',
  database: 'reestr',
  port: 5432, 
});

app.get('/getAll', async (req, res) => {
    try {
      const { rows } = await pool.query(query);
      const translatedData = transateRows(rows)
      res.json(translatedData);
    } catch (error) {
      res.status(500).send('Ошибка сервера');
    }
  });
  
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});