import { fastify, PORT } from "./app";

async function start() {
    try {
        await fastify.listen({ port: PORT });
        fastify.log.info(`server listening on ${PORT}`);
    } catch (error) {
        fastify.log.error(error);

        // This line of code terminates the Node.js process with a non-zero exit status (1),
        // indicating that an error occurred.
        process.exit(1);
    }
}

start();
