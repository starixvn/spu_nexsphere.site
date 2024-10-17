
export type Permission = Array<{ [key: string]: any }>;

export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    permission: Permission | {};
};

export type UserInfo = {
    id: number;
    username: string;
    role: string;
    permission: Permission | {};
};


export type LoginRequest = {
    userName: string;
    password: string;
};