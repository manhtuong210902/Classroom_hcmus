import axiosClient from '../axios/axiosClient';

export const authService = {
    login: (username, password) => {
        return axiosClient.post(
            `/auth/login`,
            {
                username: username,
                password: password
            },
            {
                withCredentials: false
            }
        );
    }
}

export const classService = {
    getAll: () => {
        return axiosClient.get(`/admin/class`);
    },

    banOrUnbanAClass: (data) => {
        return axiosClient.post(`/admin/activate/class`, data);
    },
}

export const userService = {
    getAll: () => {
        return axiosClient.get('/admin/user');
    },

    banOrUnbanAUser: (data) => {
        return axiosClient.post('/admin/activate/user', data)
    }
}

export const getUser = () => JSON.parse(localStorage.getItem('adm'));
export const setUser = (data) => localStorage.setItem('adm', JSON.stringify(data));
export const removeUser = () => localStorage.removeItem('adm');