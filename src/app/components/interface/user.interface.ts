export interface IUser {
    id?: number;
    name: string;
    username?: string;
    email: string;
    address?: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        };
    }
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase?: string;
        bs?: string;
    };
};

export interface ICreateUser {
    id: number;
    name: string;
    email: string;
    website: string;
    phone: string;
    company: {
        name: string;
    }
}

export interface IUserRole {
    name: string;
    email: string;
    isAdmin: boolean | null;
}
