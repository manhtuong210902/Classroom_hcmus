import { ROUTE } from "../axiosClient";
import { CLASS, PREFIX } from "../endpoints";

export const LIST_CLASS_API = `${ROUTE}/${PREFIX}/${CLASS}/user-classes`;
export const LIST_USER_IN_CLASS_API = `${ROUTE}/${PREFIX}/${CLASS}/users`;
export const CREATE_CLASS_API = `${ROUTE}/${PREFIX}/${CLASS}/management`;
export const CHECK_HAS_CLASS_API = `${ROUTE}/${PREFIX}/${CLASS}/has-user`;
export const GET_CLASS_DETAIL = `${ROUTE}/${PREFIX}/${CLASS}/detail`;
export const GET_INVITE_URL_API = `${ROUTE}/${PREFIX}/${CLASS}/invite`;
export const SEND_EMAIL_INVITE_API = `${ROUTE}/${PREFIX}/${CLASS}/send-mail-invite`;
export const JOIN_CLASS_WITH_INVITE_LINK_API = `${ROUTE}/${PREFIX}/${CLASS}/verify-invite`;
export const JOIN_CLASS_WITH_EMAIL_LINK = `${ROUTE}/${PREFIX}/${CLASS}/verify-mail-invite`;
