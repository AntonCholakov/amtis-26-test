import client from './client';

export const getActivities = async () => {
    const { data } = await client.get('/activities');
    return data;
};

export const getActivity = async (id) => {
    const { data } = await client.get(`/activities/${id}`);
    return data;
};

export const donateToActivity = async (id, payload) => {
    const { data } = await client.post(`/activities/${id}/donate`, payload);
    return data;
};

export const participateInActivity = async (id, payload) => {
    const { data } = await client.post(`/activities/${id}/participate`, payload);
    return data;
};

export const addActivityComment = async (id, payload) => {
    const { data } = await client.post(`/activities/${id}/comments`, payload);
    return data;
};

export const upvoteActivityComment = async (id, commentId) => {
    const { data } = await client.post(`/activities/${id}/comments/${commentId}/upvote`);
    return data;
};

export const removeUpvoteActivityComment = async (id, commentId) => {
    const { data } = await client.post(`/activities/${id}/comments/${commentId}/remove-upvote`);
    return data;
};
