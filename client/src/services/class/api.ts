import { ROUTE } from "../axiosClient";
import { CLASS, PREFIX } from "../endpoints";

export const LIST_CLASS_API = `${ROUTE}/${PREFIX}/${CLASS}/user-classes`;
export const LIST_USER_IN_CLASS_API = `${ROUTE}/${PREFIX}/${CLASS}/users`;
export const CREATE_CLASS_API = `${ROUTE}/${PREFIX}/${CLASS}/management`;
