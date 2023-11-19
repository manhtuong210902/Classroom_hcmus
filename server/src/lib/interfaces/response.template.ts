export class ResponseTemplate <T>{
    readonly data: T;
    readonly message: string;
    readonly statusCode: number;
}