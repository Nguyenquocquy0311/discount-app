import { getAuthToken } from "@/utils/helper";
import { UserResponse, UserType } from "@/types/user";

const path = 'http://localhost:8080/api/account'
const token = getAuthToken();

export const getListAccount = async (): Promise<UserResponse[]> => {
    try {
        if (!token) {
            throw new Error('Token is not available');
        }

        const response = await fetch(`${path}/admin/list_account`, {
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

export const deleteUser = async (id: number): Promise<void> => {
    try {
        if (!token) {
            throw new Error('Token is not available');
        }

        const response = await fetch(`${path}/admin/delete_account/${id}`, {
            method: 'DELETE',
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


export const addAccount = async (username: string, name: string, email: string, password: string, roleId: number): Promise<void> => {
    try {
        if (!token) {
            throw new Error('Token is not available');
        }

        const response = await fetch(`${path}/admin/create_account`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ username, name, email, password, roleId })
        });

        if (!response.ok) {
            throw new Error('Failed to add account');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding account:', error);
        throw error;
    }
}

export const updateAccount = async (id: number, username: string, name: string, email: string, roleId: number): Promise<void> => {
    try {
        if (!token) {
            throw new Error('Token is not available');
        }

        const response = await fetch(`${path}/admin/update_info/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ username, name, email, roleId })
        });

        if (!response.ok) {
            throw new Error('Failed to update account');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating account:', error);
        throw error;
    }
}

export const uploadAvatar = async (file: File): Promise<UserType> => {
    try {
        if (!token) {
            throw new Error('Token is not available');
        }

        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`${path}/upload_image`, {
            method: 'POST',
            headers: {
                'accept': '*/*',
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error('Failed to upload avatar');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error uploading avatar:', error);
        throw error;
    }
};

export const updateUserInfo = async (name: string, email: string): Promise<UserType> => {
    try {
        if (!token) {
            throw new Error('Token is not available');
        }

        const response = await fetch(`${path}/update_info`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ name, email })
        });

        if (!response.ok) {
            throw new Error('Failed to update user information');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating user information:', error);
        throw error;
    }
};




