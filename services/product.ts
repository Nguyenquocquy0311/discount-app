import { Product } from "@/types/product";

export const getAllProducts = async (): Promise<Product[]> => {
    try {
        const response = await fetch('http://localhost:8080/api/products', {
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
