import { DoneFuncWithErrOrRes, FastifyReply, FastifyRequest } from "fastify";
import { authFunction } from "../utils/authFunction";
import { addRecord } from "../controllers/records";
// import { upload } from "../app";

const Record = {
    type: "object",
    properties: {
        id: { type: "string" },
        artist: { type: "string" },
        title: { type: "string" },
        country: { type: "string" },
        released: { type: "string" },
        genre: { type: "string" },
        style: { type: "string" },
        format: { type: "string" },
        label: { type: "string" },
        price: { type: "string" },
        image: { type: "string" }
    }
};

export const getRecordsOpts = {
    schema: {
        response: {
            200: {
                type: "array",
                records: Record
            }
        }
    }
};

export const getRecordOpts = {
    schema: {
        response: {
            200: {
                type: "object",
                properties: {
                    record: Record
                }
            }
        }
    }
};

export const postRecordOpts = {
    schema: {
        consumes: ["multipart/form-data"],
        body: {
            type: "object",
            required: ["artist", "title", "country", "released", "genre", "style", "format", "label", "price", "file"],
            properties: {
                record: Record
            }
        },
        response: {
            201: {
                type: "object",
                properties: {
                    record: Record
                }
            }
        }
    },
    handler: addRecord,
    preHandler: authFunction
};

export const updateRecordOpts = {
    schema: {
        body: {
            type: "object",
            properties: {
                record: {
                    type: "object",
                    required: ["artist", "title", "country", "released", "genre", "style", "format", "label"],
                    properties: {
                        record: Record
                    }
                }
            }
        },
        response: {
            200: {
                type: "object",
                properties: {
                    record: Record
                }
            }
        }
    }
};

export const patchRecordOpts = {};

export const deleteRecordOpts = {
    schema: {
        response: {
            200: {
                type: "object",
                properties: {
                    message: { type: "string" }
                }
            }
        }
    }
};

export const loginOpts = {
    schema: {
        body: {},
        response: {}
    }
};

export const registerOpts = {
    schema: {
        body: {
            type: "object",
            required: ["username", "email", "password", "first_name", "last_name", "country"],
            properties: {
                username: { type: "string" },
                email: { type: "string" },
                password: { type: "string" },
                first_name: { type: "string" },
                last_name: { type: "string" },
                country: { type: "string" }
            }
        },
        response: {}
    }
};
