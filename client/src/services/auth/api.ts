import { ROUTE } from "../axiosClient";
import { AUTH, PREFIX } from "../endpoints";

export const LOGIN_API = `${ROUTE}/${PREFIX}/${AUTH}/login`;
export const REGISTER_API = `${ROUTE}/${PREFIX}/${AUTH}/register`;
