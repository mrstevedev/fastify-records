import { FastifyReply, FastifyRequest } from "fastify";

/**
 * Login
 */
export const logout = (_request: FastifyRequest, reply: FastifyReply) => {
    // Logout user

    reply.send({ message: "Logout" });
};
