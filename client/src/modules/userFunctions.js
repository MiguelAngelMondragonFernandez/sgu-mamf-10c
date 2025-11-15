import Axios from 'axios';
const ENV = import.meta.env;


const apiClient = Axios.create({
    baseURL: `${ENV.VITE_API_PROTOCOL}${ENV.VITE_API_HOST}:${ENV.VITE_API_PORT}${ENV.VITE_API_BASE}`,
    headers: {
        'Content-Type': 'application/json',
    },
});


const getAllUsers = async () => {
    try {
        const response = await apiClient.get('/users/');
        return response.data;
    } catch (error) {
        console.error('Error fetching all users:', error);
        throw error;
    }
}

const getUserData = async (userId) => {
    try {
        const response = await apiClient.get(`/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}

const postUserData = async (userData) => {
    try {
        const response = await apiClient.post('/users/', userData);
        return response.data;
    } catch (error) {
        console.error('Error posting user data:', error);
        throw error;
    }
}
const updateUserData = async (userData) => {
    try {
        const response = await apiClient.put(`/users/`, userData);
        return response.data;
    } catch (error) {
        console.error('Error updating user data:', error);
        throw error;
    }
}

const deleteUserData = async (userId) => {
    try {
        const response = await apiClient.delete(`/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting user data:', error);
        throw error;
    }
}

export {
    getAllUsers,
    getUserData,
    postUserData,
    updateUserData,
    deleteUserData
};