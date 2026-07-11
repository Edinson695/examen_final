import axios  from "axios";
import type { LoginPayload } from "../types";
import type { LoginResponse } from "../types";
import type { RegisterPayload } from "../types";
import type { Product, ProductNew } from "../types";

const api = axios.create({
    baseURL: 'https://cs2031-2026-1-pc2-techstore-production.up.railway.app',
    headers:{
        'Content-Type' : 'application/json',
    },
});


api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const registerUser = async (data: RegisterPayload) : Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('auth/register',data);
    return response.data;
}

export const loginUser = async (data: LoginPayload) : Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('auth/login', data);
    return response.data;
}

export const allProducts = async () : Promise<Product[]> => {
    const response = await api.get<Product[]>('products');
    return response.data;
}

export const newProduct = async (data: ProductNew) : Promise<Product> => {
    const response = await api.put('/api/auth/login', data);
    return response.data;
}

export const deleteProduct = async (productId : number ) : Promise<void> => {
    await api.delete(`/api/product/${productId}`);
    return;
}