import { getAuthToken } from "@/helper";
import { IProduct, Product } from "@/types/product";

const token = getAuthToken();

export const getAllProducts = async (): Promise<IProduct[]> => {
    try {
        const response = await fetch('http://localhost:8080/api/products', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : ''
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const getProductDetail = async (id: number): Promise<Product> => {
    try {
        const response = await fetch(`http://localhost:8080/api/product/detail?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};


