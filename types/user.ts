import { Role } from "@/constant/role";

export interface UserType {
    id: number;
    name: string;
    username: string;
    email: string;
    avatar?: string,
    role: Role
}

export interface UserResponse {
    id: number;
    username: string;
    name: string;
    email: string;
    password: string;
    avatar: string | null;
    roleId: number
    role:{
        id: number;
        roleName: string;
        createdAt: string;
        updatedAt: string;
    };
}
