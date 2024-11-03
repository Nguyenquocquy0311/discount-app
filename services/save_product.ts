import { getAuthHeader, getAuthToken } from "@/helper";
import { IProduct } from "@/types/product";

const path = 'http://localhost:8080/api/save_product';
const token = getAuthToken();

export const saveProduct = async (productId: number): Promise<boolean> => {
    try {
        const token = getAuthToken();
        const response = await fetch(`${path}/save?productId=${productId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error('Failed to save product');
        }

        const responseText = await response.text();
        return responseText === 'Product saved successfully';

    } catch (error) {
        console.error('Error saving product:', error);
        throw error;
    }
};

export const getSavedProducts = async (): Promise<IProduct[]> => {
    try {
        const response = await fetch(`${path}/get_save_product`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
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

export const deleteSavedProduct = async (productId: number) => {
    try {
        const response = await fetch(`${path}/delete?productId=${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete saved product');
        }
    } catch (error) {
        console.error('Error deleting saved product:', error);
        throw error;
    }
};