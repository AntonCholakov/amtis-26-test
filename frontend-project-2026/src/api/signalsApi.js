import client from './client';

export const getSignals = async () => {
    const { data } = await client.get('/signals');
    return data;
};

export const getSignal = async (id) => {
    const { data } = await client.get(`/signals/${id}`);
    return data;
};

export const createSignal = async (payload) => {
    const { data } = await client.post('/signals', payload);
    return data;
};

export const updateSignal = async (id, payload) => {
    const { data } = await client.patch(`/signals/${id}`, payload);
    return data;
};

export const deleteSignal = async (id) => {
    const { data } = await client.delete(`/signals/${id}`);
    return data;
};
