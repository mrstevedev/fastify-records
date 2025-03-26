import { FastifyReply, FastifyRequest } from "fastify";
import { BodyType, ParamsType, UploadType } from "../types";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "../client/prisma";
import { ResponseMessage } from "../constants";
import { s3 } from "../client/aws";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

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
 * Upload a file
 * @param request
 * @param reply
 */

async function UploadFileToS3(data: any, params: any) {
    const command = new PutObjectCommand(params);
    const presignedURL = await getSignedUrl(s3, command, { expiresIn: 360 });

    await fetch(presignedURL, { method: "PUT", body: data.file?._buf });
}

/**
 * Create a new item
 */
export const addRecord = async (request: FastifyRequest<{ Body: UploadType }>, reply: FastifyReply) => {
    const data = request.body;

    const artist = data.artist.value;
    const title = data.title.value;
    const country = data.country.value;
    const released = data.released.value;
    const genre = data.genre.value;
    const style = data.style.value;
    const format = data.format.value;
    const label = data.label.value;
    const price = data.price.value;

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME as string,
        Key: data.file.filename
    };

    await UploadFileToS3(data, params);

    const command = new GetObjectCommand(params);
    const signedURL = await getSignedUrl(s3, command, { expiresIn: 3600 });

    const record = await prisma.record.findFirst({
        where: { artist, title }
    });

    if (record) return reply.status(400).send({ message: ResponseMessage.RECORD_ALREADY_EXISTS });

    const newItem = await prisma.record.create({
        data: { id: uuidv4(), artist, title, country, released, genre, style, format, label, price, image: signedURL }
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
    const { id } = request.params;
    const { artist, title, country, released, genre, style, format, label, price } = request.body;

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
