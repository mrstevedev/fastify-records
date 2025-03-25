import { FastifyReply, FastifyRequest } from "fastify";
import { BodyUserType } from "../types";
import { prisma } from "../client/prisma";
import { CookieName, ResponseMessage } from "../constants";
import { fastify } from "../app";

/**
 * Register
 */

export const login = async (request: FastifyRequest<{ Body: BodyUserType }>, reply: FastifyReply) => {
    const username = request.body?.username;
    const password = request.body?.password;
    const found = await prisma.user.findUnique({
        where: { username }
    });

    if (!found) return reply.status(400).send({ message: ResponseMessage.USER_NOT_FOUND });
    if (!(await fastify.bcrypt.compare(password, found.password)))
        return reply.status(400).send({ message: ResponseMessage.PASSWORD_INCORRECT });

    const refresh_token = fastify.jwt.sign({ id: found.id }, { expiresIn: "7d" });
    const access_token = fastify.jwt.sign({ id: found.id }, { expiresIn: "15m" });

    reply.setCookie(CookieName.REFRESH_TOKEN, refresh_token, { httpOnly: true, path: "/", secure: true, sameSite: "Strict" });
    reply.status(200).send({ access_token });
};
