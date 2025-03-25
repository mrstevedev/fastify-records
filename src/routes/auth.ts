import { FastifyInstance } from "fastify";
import { loginOpts, registerOpts } from "../validators";
import { login } from "../controllers/login";
import { logout } from "../controllers/logout";
import { register } from "../controllers/register";

export default async function Routes(fastify: FastifyInstance, _options: any, done: any) {
    fastify.post("/auth/login", loginOpts, login);
    fastify.post("/auth/logout", logout);
    fastify.post("/auth/register", registerOpts, register);

    done();
}
