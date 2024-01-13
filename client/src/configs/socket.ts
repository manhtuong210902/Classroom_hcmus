import { LocalStorage } from "@src/utils/LocalStorage";
import { BASE_URL_API } from "@src/utils/constants";
import { io } from "socket.io-client";

const userId = LocalStorage.getUserId();

const socket = io(String(BASE_URL_API), {
    extraHeaders: {
        Authorization: String(userId),
    },
});

export default socket;
