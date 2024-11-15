import { getAuthToken } from "@/utils/helper";
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

export const getCouponCategory = async (): Promise<{ id: number, categoryName: string }[]> => {
    try {
        const response = await fetch(`${path}/get_coupon_category`, {
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
}

export const createCoupon = async (coupon: Voucher): Promise<void> => {
    try {
        const response = await fetch(`${path}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(coupon)
        });

        if (!response.ok) {
            throw new Error('Failed to create coupon');
        }
    } catch (error) {
        console.error('Error creating coupon:', error);
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
