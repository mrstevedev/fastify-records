export enum HttpStatusCode {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500
}

export enum RequestType {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE"
}

export enum ContentType {
    JSON = "application/json",
    BINARY = "application/octet-stream"
}

export enum CookieName {
    REFRESH_TOKEN = "refresh_token",
    ACCESS_TOKEN = "access_token"
}

export enum ResponseMessage {
    CREATED = "Created",
    BAD_REQUEST = "Bad Request",
    NOT_FOUND = "Not Found",
    INTERNAL_SERVER_ERROR = "Internal Server Error",
    UNAUTHORIZED = "Unauthorized",
    FORBIDDEN = "Forbidden",
    CONFLICT = "Conflict",
    UNPROCESSABLE_ENTITY = "Unprocessable Entity",
    TOO_MANY_REQUESTS = "Too Many Requests",
    SERVER_ERROR = "Server Error",
    SERVICE_UNAVAILABLE = "Service Unavailable",
    GATEWAY_TIMEOUT = "Gateway Timeout",
    BAD_GATEWAY = "Bad Gateway",
    INSUFFICIENT_STORAGE = "Insufficient Storage",
    LOCKED = "Locked",
    METHOD_NOT_ALLOWED = "Method Not Allowed",
    NOT_IMPLEMENTED = "Not Implemented",
    NETWORK_AUTHENTICATION_REQUIRED = "Network Authentication Required",
    RECORD_NOT_FOUND = "Record Not Found",
    ID_NOT_FOUND = "The ID provided was not found",
    USER_CREATED = "User Created",
    USER_NOT_FOUND = "User Not Found",
    PASSWORD_INCORRECT = "Password Incorrect",
    RECORD_ALREADY_EXISTS = "Record Already Exists"
}

export enum Role {
    USER = "USER",
    ADMIN = "ADMIN"
}
