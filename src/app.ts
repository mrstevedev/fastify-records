import { FastifyInstance } from "fastify";
import { CustomFastify } from "./types";
import multipart from "@fastify/multipart";
import fastifyHelmet from "@fastify/helmet";

// Use declaration merging to add the new type to FastifyInstance
declare module "fastify" {
    interface FastifyInstance {
        jwt: CustomFastify;
        bcrypt: CustomFastify;
    }

    interface FastifyReply {
        setCookie: (name: string, value: string, options?: any) => void;
    }
}

export const fastify: FastifyInstance = require("fastify")({
    logger: true
});

export const PORT = process.env.PORT ? Number(process.env.PORT) : 9000;

fastify.register(fastifyHelmet, {
    global: true,
    contentSecurityPolicy: false
});
fastify.register(multipart, {
    attachFieldsToBody: true
});
fastify.register(require("@fastify/swagger"));
fastify.register(require("@fastify/swagger-ui"), {
    prefix: "/docs"
});
fastify.register(require("./routes/auth"));
fastify.register(require("./routes/records"));
fastify.register(require("fastify-bcrypt"), {
    saltWorkFactor: 12
});
fastify.register(require("@fastify/jwt"), {
    secret: process.env.JWT_SECRET
});
fastify.register(require("@fastify/cookie"));
