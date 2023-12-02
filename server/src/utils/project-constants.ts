import { RoleType } from "src/lib/util/constant"

export const DEFAULT_ROLE = RoleType.USER

export const ERROR_CODE = {
    
    // auth
    USER_NOT_VERIFIED : 'USER_NOT_VERIFIED',
    USER_NOT_FOUND : 'USER_NOT_FOUND',
    WRONG_PASSWORD : 'WRONG_PASSWORD',
    USERNAME_IS_USED : 'USERNAME_IS_USED',
    EMAIL_IS_USED: 'EMAIL_IS_USED',
    INVALID_TOKEN :'INVALID_TOKEN',

    // global
    BAD_REQUEST : 'BAD_REQUEST'

}

export const ERROR_MSG = {
    
    // auth
    USER_NOT_VERIFIED : 'USER_NOT_VERIFIED',
    USER_NOT_FOUND : 'User not found',
    WRONG_PASSWORD : 'Username or password is incorrect',
    USERNAME_IS_USED : 'This username is already in used.',
    EMAIL_IS_USED: 'Email is already in use',
    INVALID_TOKEN :'Invalid refresh token',

    //global
    BAD_REQUEST : 'BAD_REQUEST'
}