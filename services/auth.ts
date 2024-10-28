const path = 'http://localhost:8080/api/auth';

export const forgotPassword = async (email: string): Promise<string> => {
    try {
        const response = await fetch(`${path}/forgot-password?email=${email}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to send forgot password request');
        }

        const data = await response.text();
        return data;
    } catch (error) {
        console.error('Error in forgot password:', error);
        throw error;
    }
};

export const resetPassword = async (token: string, password: string): Promise<string> => {
    try {
        const response = await fetch(`${path}/reset-password?token=${token}&newPassword=${password}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to reset password');
        }

        const data = await response.text();
        return data;
    } catch (error) {
        console.error('Error in reset password:', error);
        throw error;
    }
}

