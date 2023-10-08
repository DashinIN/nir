/* eslint-disable no-unused-vars */
import  { useState } from 'react';
import { utils as XLSXUtils, writeFile as XLSXWriteFile } from 'xlsx';
import './index.scss'

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/getAllTitles');
      if (!response.ok) {
        throw new Error('Ошибка при получении данных');
      }
      const jsonData = await response.json();
      setData(jsonData);
      console.log(jsonData)
      // const ws = XLSXUtils.json_to_sheet(jsonData);
      // const wb = XLSXUtils.book_new();
      // XLSXUtils.book_append_sheet(wb, ws, 'Лист 1');
      // XLSXWriteFile(wb, 'Таблица.xlsx');
    } catch (error) {
      console.error('Ошибка:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Сгенерировать отчет</h1>
      <button onClick={fetchData} disabled={loading}>
        {loading ? 'Загрузка...' : 'Получить таблицу'}
      </button>
    </div>
  );
}

export default App;