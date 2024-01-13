import { RoleType } from "src/lib/util/constant"

export const DEFAULT_ROLE = RoleType.USER

export const ERROR_CODE = {

    // auth
    USER_NOT_VERIFIED: 'USER_NOT_VERIFIED',
    USER_NOT_FOUND: 'USER_NOT_FOUND',
    WRONG_PASSWORD: 'WRONG_PASSWORD',
    USERNAME_IS_USED: 'USERNAME_IS_USED',
    EMAIL_IS_USED: 'EMAIL_IS_USED',
    INVALID_TOKEN: 'INVALID_TOKEN',

    // class
    IS_EXIST_CLASS_NAME: 'IS_EXIST_CLASS_NAME',

    // global
    BAD_REQUEST: 'BAD_REQUEST'

}

export const ERROR_MSG = {

    // auth
    USER_NOT_VERIFIED: 'USER_NOT_VERIFIED',
    USER_NOT_FOUND: 'User not found',
    WRONG_PASSWORD: 'Username or password is incorrect',
    USERNAME_IS_USED: 'This username is already in used.',
    EMAIL_IS_USED: 'Email is already in use',
    INVALID_TOKEN: 'Invalid refresh token',


    // class
    IS_EXIST_CLASS_NAME: 'Class name is already in used.',

    //global
    BAD_REQUEST: 'BAD_REQUEST'
}

export const SOCKET_TYPE = {
    TEACHER_EMIT: 'TEACHER_EMIT',
    STUDENT_EMIT: 'STUDENT_EMIT',

    CREATE_NEW_GRADE_COMPOSITION: 'CREATE_NEW_GRADE_COMPOSITION',
    FINAL_A_GRADE_COMPOSITION: 'FINAL_A_GRADE_COMPOSITION',
    TEACHER_COMMENT_REVIEW: 'TEACHER_COMMENT_REVIEW',
    STUDENT_COMMENT_REVIEW: 'STUDENT_COMMENT_REVIEW',
    TEACHER_FINAL_REVIEW: 'TEACHER_FINAL_REVIEW',
    STUDENT_REQUEST_REVIEW: 'STUDENT_REQUEST_REVIEW',
}

export const SOCKET_MSG = {
    CREATE_NEW_GRADE_COMPOSITION: 'Teacher has created new grade composition',
    FINAL_A_GRADE_COMPOSITION: 'Teacher has finalized a grade composition',
    TEACHER_COMMENT_REVIEW: 'Teacher has comment your request review',
    STUDENT_COMMENT_REVIEW: 'Student has comment the review',
    TEACHER_FINAL_REVIEW: 'Teacher has final the review',
    STUDENT_REQUEST_REVIEW: 'Student has create request review'
}