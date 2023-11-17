import { MessageValidationFilter } from "./message.filter";

export interface ResponseValidationFilter {
    readonly error: string;
    readonly message: MessageValidationFilter[];
    readonly statusCode: number;
}