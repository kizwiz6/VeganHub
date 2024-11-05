// src/lib/api/axios.ts
import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://localhost:7777/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});