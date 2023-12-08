import { MessageInfo } from "./types";

export const BASE_URL_API = process.env.VITE_API_URL;

export const errorMessage: MessageInfo = {
    message: "An error has occurred",
    statusCode: 322,
};
