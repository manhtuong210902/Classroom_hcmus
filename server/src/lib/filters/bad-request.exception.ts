import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    BadRequestException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Response } from 'express';
import { ErrorMessage } from 'src/utils';


@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
    constructor(public reflector: Reflector) {}
    catch(exception: BadRequestException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const status = exception.getStatus(); 
        const message = exception.message || 'Bad Request';
        const error : any = exception.getResponse();
        let errorCode;
        try {
            errorCode = error?.getResponse()?.errorCode
        } catch (err) {
            errorCode = error.errorCode
        }
        response.status(status).json({
            error: errorCode || "Bad Request",
            statusCode: status,
            message: message,
        });
    }
}
