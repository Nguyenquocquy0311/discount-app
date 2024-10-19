import { getAuthHeader, getAuthToken } from "@/helper";

const path = 'http://localhost:8080/api/save_product';

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
