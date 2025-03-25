import { FastifyReply, FastifyRequest } from "fastify";
import { BodyType, ParamsType } from "../types";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "../client/prisma";
import { ResponseMessage } from "../constants";

export const getRecords = async (_request: FastifyRequest, reply: FastifyReply) => {
    const records = await prisma.record.findMany();

    reply.send(records);
};

/**
 * Get a single item
 */
export const getRecord = async (request: FastifyRequest<{ Params: ParamsType }>, reply: FastifyReply) => {
    const id = request.params?.id;

    if (!id) return reply.status(400).send({ message: ResponseMessage.ID_NOT_FOUND });

    const record = await prisma.record.findUnique({
        where: { id }
    });

    if (!record) return reply.status(404).send({ message: ResponseMessage.RECORD_NOT_FOUND });

    reply.status(200).send({ record });
};

/**
 * Create a new item
 */
export const addRecord = async (request: FastifyRequest<{ Body: BodyType }>, reply: FastifyReply) => {
    const file = request.body.image;

    console.log("file", file);

    // 1. Upload the file to S3 bucket
    // 2. Get the URL of the uploaded file
    // 3. Save the URL to the database

    const record = await prisma.record.findFirst({
        where: {
            artist: request.body?.artist,
            title: request.body?.title
        }
    });

    if (record) return reply.status(400).send({ message: ResponseMessage.RECORD_ALREADY_EXISTS });

    const newItem = await prisma.record.create({
        data: {
            id: uuidv4(),
            artist: request.body?.artist,
            title: request.body?.title,
            country: request.body?.country,
            released: request.body?.released,
            genre: request.body?.genre,
            style: request.body?.style,
            format: request.body?.format,
            label: request.body?.label,
            price: request.body?.price,
            image: request.body?.image
        }
    });

    reply.code(201).send({ record: newItem });
};

/**
 * Delete an item
 */
export const deleteRecord = async (request: FastifyRequest<{ Params: ParamsType }>, reply: FastifyReply) => {
    const id = request.params.id;

    const found = await prisma.record.findUnique({
        where: { id }
    });

    if (!found) return reply.status(400).send({ message: ResponseMessage.ID_NOT_FOUND });

    await prisma.record.delete({
        where: { id }
    });

    reply.status(200).send({ message: `Item ${id} deleted` });
};

/**
 * Update an item
 */
export const updateRecord = async (request: FastifyRequest<{ Params: ParamsType; Body: BodyType }>, reply: FastifyReply) => {
    const id = request.params.id;
    const artist = request.body?.artist;
    const title = request.body?.title;
    const country = request.body?.country;
    const released = request.body?.released;
    const genre = request.body?.genre;
    const style = request.body?.style;
    const format = request.body?.format;
    const label = request.body?.label;
    const price = request.body?.price;

    const record = prisma.record.findUnique({
        where: { id }
    });

    if (!record) return reply.status(404).send({ message: ResponseMessage.RECORD_NOT_FOUND });

    const updated = await prisma.record.update({
        where: { id },
        data: { artist, title, country, released, genre, style, format, label, price }
    });

    reply.status(200).send({ record: updated });
};

export const patchRecord = (request: FastifyRequest<{ Params: ParamsType }>, reply: FastifyReply) => {};

/**
 * Logout
 */
export const logout = (request: FastifyRequest, reply: FastifyReply) => {
    reply.send({ message: "Logout" });
};
