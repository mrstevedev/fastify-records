import { FastifyInstance } from "fastify";
import { deleteRecordOpts, getRecordOpts, getRecordsOpts, postRecordOpts, updateRecordOpts } from "../validators";
import { deleteRecord, getRecords, getRecord, updateRecord } from "../controllers/records";

// Register routes as a plugin
export default async function Routes(fastify: FastifyInstance, _options: any, done: any) {
    fastify.get("/records", getRecordsOpts, getRecords);
    fastify.get("/records/:id", getRecordOpts, getRecord);
    fastify.post("/records", postRecordOpts);
    fastify.put("/records/:id", updateRecordOpts, updateRecord);
    fastify.delete("/records/:id", deleteRecordOpts, deleteRecord);

    done();
}
