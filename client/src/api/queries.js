export const fetchAllTitles = async () => {
    const response = await fetch('http://localhost:5000/getAllTitles');
    if (!response.ok) {
        throw new Error('Ошибка при получении данных');
    }
    return response.json();
};

export const  sendSelectedTitles = async (items) =>  {
    const response = await fetch('http://localhost:5000/postOrder', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(items),
    });
    if (!response.ok) {
        throw new Error('Ошибка HTTP: ' + response.status);
    }
    return response.json();
};