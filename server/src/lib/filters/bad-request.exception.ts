import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    BadRequestException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Response } from 'express';


@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
    constructor(public reflector: Reflector) {}
    catch(exception: BadRequestException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const status = exception.getStatus(); 
        const message = exception.message || 'Bad Request';
        
        response.status(status).json({
            error: "Bad Request",
            statusCode: status,
            message: message,
        });
    }
}
