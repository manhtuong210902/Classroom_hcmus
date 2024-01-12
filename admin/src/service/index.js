import axios from 'axios';

import axiosClient from '../axios/axiosClient';

export const authService = {
    login: async (username, password) => {
        return axiosClient.post(
            `/auth/login`,
            {
                username: username,
                password: password
            },
            {
                withCredentials: false
            }
        )
    }
}

export const classService = {
    getAll: async () => {
        return axiosClient.get(`/admin/class`);
    }
}

export const getUser = () => JSON.parse(localStorage.getItem('adm'));
export const setUser = (data) => localStorage.setItem('adm', JSON.stringify(data));
export const removeUser = () => localStorage.removeItem('adm');