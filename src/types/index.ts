export type ParamsType = {
    id: string;
};

export type BodyType = {
    id: string;
    artist: string;
    title: string;
    country: string;
    released: string;
    genre: string;
    style: string;
    format: string;
    label: string;
    price: string;
    image: string;
};

export type BodyUserType = {
    username: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    country: string;
    role: string;
};

// Define the new property or method's type
export interface CustomFastify {
    jwt: (options: any) => string;
    hash(password: string): string;
    sign(payload: any, options?: any): string;
    compare(password: string, hash: string): string;
    verify(token: string | undefined, secret: string | undefined): any;
}
