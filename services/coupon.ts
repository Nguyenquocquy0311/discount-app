import { getAuthToken } from "@/helper";
import { Voucher } from "@/types/voucher";

const path = 'http://localhost:8080/api/coupon'
const token = getAuthToken();

export const getAllCoupon = async (): Promise<Voucher[]> => {
    try {
        const response = await fetch(`${path}/get_all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch coupons');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching coupons:', error);
        throw error;
    }
};

export const deleteCoupon = async (id: number): Promise<void> => {
    try {
        const response = await fetch(`${path}/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch coupons');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching coupons:', error);
        throw error;
    }
};

export const getValidCoupon = async (): Promise<Voucher[]> => {
    try {
        const response = await fetch(`${path}/get_valid`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch coupons');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching coupons:', error);
        throw error;
    }
};
