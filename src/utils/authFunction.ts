import { DoneFuncWithErrOrRes, FastifyReply, FastifyRequest } from "fastify";
import { ResponseMessage } from "../constants";
import { fastify } from "../app";

export async function authFunction(request: FastifyRequest, reply: FastifyReply, done: DoneFuncWithErrOrRes) {
    const requestToken = request.headers["authorization"];
    const token = requestToken?.split(" ")[1];
    const decoded = fastify.jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) return reply.status(401).send({ error: "Invalid token" });
    if (!token) return reply.status(401).send({ error: ResponseMessage.UNAUTHORIZED });
}
