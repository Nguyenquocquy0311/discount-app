import { getAuthToken } from "@/utils/helper";
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

export const getProductType = async (): Promise<{ id: number, category: string }[]> => {
    try {
        const response = await fetch('http://localhost:8080/api/product/get_product_type', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : ''
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch product types');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching product types:', error);
        throw error;
    }
};

export const createProduct = async (product: {
    name: string,
    currentPrice: number,
    productType: number,
    affLink: string,
    image: string
}): Promise<void> => {
    try {
        const response = await fetch('http://localhost:8080/api/product/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : ''
            },
            body: JSON.stringify(product)
        });

        if (!response.ok) {
            throw new Error('Failed to create product');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};

export const updateProduct = async (id: number, product: {
    name: string,
    currentPrice: number,
    productType: number,
    affLink: string,
    image: string
}): Promise<void> => {
    try {
        const response = await fetch(`http://localhost:8080/api/product/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : ''
            },
            body: JSON.stringify(product)
        });

        if (!response.ok) {
            throw new Error('Failed to update product');
        }
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};

export const deleteProduct = async (id: number): Promise<void> => {
    try {
        const response = await fetch(`http://localhost:8080/api/product/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : ''
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete product');
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
};  