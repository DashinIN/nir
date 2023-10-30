import { utils, writeFile } from 'xlsx';

export const outputToExel = (data) => {
    const ws = utils.json_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Лист 1');
    writeFile(wb, 'Таблица.xlsx');
};