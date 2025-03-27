import { FastifyInstance } from "fastify";
import { getReleaseOpts } from "../validators";
import { getReleases } from "../controllers/release";

export default function Routes(fastify: FastifyInstance, _options: any, done: any) {
    fastify.get("/release/:release", getReleaseOpts, getReleases);

    done();
}
