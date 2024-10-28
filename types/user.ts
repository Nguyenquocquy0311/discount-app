export interface UserType {
    id: number;
    name: string;
    username: string;
    email: string;
    avatar?: string,
    role: 'Admin' | 'Manager' | 'User';
}

export interface UserResponse {
    id: number;
    username: string;
    name: string;
    email: string;
    avatar: string | null;
    role: {
        id: number;
        roleName: string;
        createdAt: string;
        updatedAt: string;
    };
    createdAt: string | null;
    updatedAt: string;
    enabled: boolean;
    authorities: Array<{
        authority: string;
    }>;
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    credentialsNonExpired: boolean;
}