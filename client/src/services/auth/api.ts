import { BASE_URL_API } from "@src/utils/constants";
import { ROUTE } from "../axiosClient";
import { AUTH, PREFIX } from "../endpoints";

export const LOGIN_API = `${ROUTE}/${PREFIX}/${AUTH}/login`;
export const REGISTER_API = `${ROUTE}/${PREFIX}/${AUTH}/register`;
export const LOGIN_GG_API = `${ROUTE}/${PREFIX}/${AUTH}/google/callback`;

export const AUTH_GOOGLE = `${BASE_URL_API}${ROUTE}/${PREFIX}/${AUTH}/google`;
export const AUTH_FACEBOOK = `${BASE_URL_API}${ROUTE}/${PREFIX}/${AUTH}/facebook`;
