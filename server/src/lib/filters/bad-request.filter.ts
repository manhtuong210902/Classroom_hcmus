import {
    type ArgumentsHost,
    Catch,
    type ExceptionFilter,
    UnprocessableEntityException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { type ValidationError } from 'class-validator';
import { type Response } from 'express';
import { MessageValidationFilter } from '../interfaces/message.filter';
import { ResponseValidationFilter } from '../interfaces/response.filter';

@Catch(UnprocessableEntityException)
export class HttpExceptionFilter
    implements ExceptionFilter<UnprocessableEntityException>
{
    constructor(public reflector: Reflector) {}

    catch(exception: UnprocessableEntityException, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const statusCode = exception.getStatus();
        const r = exception.getResponse() as { message: ValidationError[] ,error: string, statusCode : number };

        const validationErrors = r.message;
        const message: MessageValidationFilter[] = this.validationFilter(validationErrors);
        const res : ResponseValidationFilter = {
            "error": r.error,
            "message": message,
            "statusCode": r.statusCode
        }
        response.status(statusCode).json(res);
    }

    private validationFilter(validationErrors: ValidationError[]): MessageValidationFilter[] {

        let messages : MessageValidationFilter[] = [];

        for (const validationError of validationErrors) {

            delete validationError.children;

            const constraints = validationError.constraints;

            if (!constraints) {
                return;
            }
            let error: string; 
            for (const [constraintKey, constraint] of Object.entries(
                constraints,
            )) {
                // find the first error message
                if (constraint[constraintKey] !== ''){
                    error = constraint;
                    break;
                }
            }
            const message : MessageValidationFilter = {
                "field": validationError.property,
                "message": error,
                "value": validationError.value
            }
            messages.push(message);    
        }
        return messages;

    }
}
