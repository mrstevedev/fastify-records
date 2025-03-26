import Stream from "node:stream";

export type ParamsType = {
    id: string;
};

export type UploadType = {
    artist: {
        fieldname: string;
        value: string;
        encoding: string;
    };
    title: {
        fieldname: string;
        value: string;
        encoding: string;
    };
    country: {
        fieldname: string;
        value: string;
        encoding: string;
    };
    released: {
        fieldname: string;
        value: string;
        encoding: string;
    };
    genre: {
        fieldname: string;
        value: string;
        encoding: string;
    };
    style: {
        fieldname: string;
        value: string;
        encoding: string;
    };
    format: {
        fieldname: string;
        value: string;
        encoding: string;
    };
    label: {
        fieldname: string;
        value: string;
        encoding: string;
    };
    price: {
        fieldname: string;
        value: string;
        encoding: string;
    };
    file: {
        fieldname: string;
        value: Stream;
        encoding: string;
        filename: string;
    };
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
    file: {
        filename: string;
        file: Stream;
    };
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
