import client from './client';

export const subscribe = async (payload) => {
    const { data } = await client.post('/newsletter/subscribe', payload);
    return data;
};
