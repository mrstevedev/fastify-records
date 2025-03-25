import { FastifyReply, FastifyRequest } from "fastify";
import { BodyUserType } from "../types";
import { prisma } from "../client/prisma";
import { ResponseMessage, Role } from "../constants";
import { fastify } from "../app";

/**
 * Register
 */

export const register = async (request: FastifyRequest<{ Body: BodyUserType }>, reply: FastifyReply) => {
    const username = request.body?.username;
    const email = request.body?.email;
    const password = await fastify.bcrypt.hash(request.body?.password);
    const country = request.body?.country;
    const first_name = request.body?.first_name;
    const last_name = request.body?.last_name;
    const role = Role.USER;

    await prisma.user.create({
        data: {
            username,
            email,
            password,
            country,
            first_name,
            last_name,
            role
        }
    });

    reply.status(201).send({ message: ResponseMessage.USER_CREATED });
};
