export type ErrorMessage = {
    errorCode: String,
    message: String
}

export function isErrorMessage(value: any): value is ErrorMessage {
    return typeof value === 'object' 
            && 'errorCode' in value 
            && 'message' in value 
            && typeof value.errorCode === 'string'
            && typeof value.message === 'string';
}