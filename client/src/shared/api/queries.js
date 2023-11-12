export const fetchAllTitles = async () => {
    const response = await fetch('http://localhost:5000/getAllTitles');
    if (!response.ok) {
        throw new Error('Ошибка при получении данных');
    }
    return response.json();
};

export const fetchSelectedData = async (items) =>  {
    const response = await fetch('http://localhost:5000/getSelectedData', {
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

export const addSample = async (data) => {
    const response = await fetch('http://localhost:5000/addSample', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
  
    if (!response.ok) {
        throw new Error('Произошла ошибка при добавлении записи');
    }
  
    return response.json();
};

export const getAllSamples = async () => {
    const response = await fetch('http://localhost:5000/getAllSamples');
    if (!response.ok) {
        throw new Error('Произошла ошибка при получении данных');
    }
    return response.json();
};