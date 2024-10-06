export interface UserType {
    name?: string;
    username?: string;
    email?: string;
    role?: 'Admin' | 'Manager' | 'User';
}