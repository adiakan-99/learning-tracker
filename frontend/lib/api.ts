import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/',
});

// Set Authorization header with JWT token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `JWT ${token}`;
    }
    return config;
});

// Authentication
export const signup = async (data: {
    username: string;
    email: string;
    password: string;
    re_password: string;
}) => {
    const response = await api.post('/auth/users/', data);
    return response.data;
};

export const login = async (data: { username: string; password: string }) => {
    const response = await api.post('/auth/jwt/create/', data);
    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
    return response.data;
};

export const getUser = async () => {
    const response = await api.get('/auth/users/me/');
    return response.data;
};

// Resources
export interface Resource {
    id: number;
    title: string;
    url: string;
    description: string;
    category: { id: number; name: string };
    completed: boolean;
}

export const getResources = async (): Promise<Resource[]> => {
    const response = await api.get('/resources/');
    return response.data;
};

export const getResource = async (id: string): Promise<Resource> => {
    const response = await api.get(`/resources/${id}/`);
    return response.data;
};

export const createResource = async (data: {
    category_id: number;
    title: string;
    url: string;
    description: string;
}) => {
    const response = await api.post('/resources/', data);
    return response.data;
};

export const markComplete = async (id: string) => {
    const response = await api.post(`/resources/${id}/mark_complete/`);
    return response.data;
};

// Summary
export const getSummary = async () => {
    const response = await api.get('/resources/summary/');
    return response.data;
};

// Categories
export const getCategories = async () => {
    const response = await api.get('/categories/');
    return response.data;
};

export const createCategory = async (data: { name: string }) => {
    const response = await api.post('/categories/', data);
    return response.data;
};

// Progress Logs
export interface ProgressLog {
    id: number;
    resource: number;
    status: string;
    notes: string;
    updated_at: string;
}

export const getProgressLogs = async (): Promise<ProgressLog[]> => {
    const response = await api.get('/progress-logs/');
    return response.data;
};

export const createProgressLog = async (data: { resource_id: number; status: string; notes: string }) => {
    const response = await api.post('/progress-logs/', data);
    return response.data;
};