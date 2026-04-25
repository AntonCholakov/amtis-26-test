import client from './client';

export const getSignalCategories = async () => {
    const { data } = await client.get('/signal-categories');
    return data;
};
