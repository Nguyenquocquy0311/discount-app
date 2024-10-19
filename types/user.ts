export interface UserType {
    name: string;
    username: string;
    email: string;
    avatar?: string,
    role: 'Admin' | 'Manager' | 'User';
}