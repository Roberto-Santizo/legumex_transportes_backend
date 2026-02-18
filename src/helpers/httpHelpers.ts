import { ConflictError, NotFoundError } from "../infrastructure/errors/errors";
import { Response } from "express";

export function errorHandler(err: Error, res: Response) {
    if (err instanceof NotFoundError) {
        return res.status(404).json({
            statusCode: 404,
            message: err.message
        });
    }

    if (err instanceof ConflictError) {
        return res.status(409).json({
            statusCode: 409,
            message: err.message
        });
    }

    return res.status(500).json({
        statusCode: 500,
        message: err.message
    });
}

export function responseHandler(res: Response, statusCode: number, message: string, data?: any) {
    return res.status(statusCode).json({
        statusCode,
        message,
        data
    });
}
