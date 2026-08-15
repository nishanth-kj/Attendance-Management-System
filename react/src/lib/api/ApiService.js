import axios from 'axios';
import { API_BASE_URL, RESPONSE_STATUS } from '@/constants';

/**
 * Core ApiService - Generic HTTP Client
 */
export class ApiService {
    constructor(url = '', payload = {}, baseUrl = API_BASE_URL, headers = {}) {
        this.url = url;
        this.payload = payload;
        this.baseUrl = baseUrl;

        this.client = axios.create({
            baseURL: this.baseUrl,
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
        });

        this.setupInterceptors();
    }

    async get(endpoint = this.url, config = {}) {
        return this.client.get(endpoint, config);
    }

    async post(endpoint = this.url, data = {}, config = {}) {
        const finalPayload = { ...this.payload, ...data };
        return this.client.post(endpoint, finalPayload, config);
    }

    async put(endpoint = this.url, data = {}, config = {}) {
        const finalPayload = { ...this.payload, ...data };
        return this.client.put(endpoint, finalPayload, config);
    }

    async delete(endpoint = this.url, config = {}) {
        return this.client.delete(endpoint, config);
    }

    setupInterceptors() {
        this.client.interceptors.request.use(
            (config) => {
                const token = sessionStorage.getItem('token') || localStorage.getItem('token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        this.client.interceptors.response.use(
            (response) => {
                const res = response.data;
                // Check for integer status 1 (Success)
                if (res && res.status === RESPONSE_STATUS.SUCCESS.code) {
                    return res.data; // Return just the data part
                }
                return response.data;
            },
            (error) => {
                if (error.response?.status === 401) {
                    localStorage.removeItem('token');
                    sessionStorage.removeItem('token');
                    if (window.location.pathname !== '/login') {
                        window.location.href = '/login';
                    }
                }
                return Promise.reject(error.response?.data?.message || error.message);
            }
        );
    }
}
