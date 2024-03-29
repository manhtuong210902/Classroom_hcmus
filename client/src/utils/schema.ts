import * as z from "zod";

export const sigupSchema = z
    .object({
        fullname: z.string().trim().min(1, { message: "Full Name is required" }).min(6, {
            message: "Full name must be at least 6 characters.",
        }),
        username: z.string().min(1, { message: "Username is required" }).min(6, {
            message: "Username must be at least 6 characters.",
        }),
        password: z
            .string()
            .min(1, { message: "Password is required" })
            .min(8, { message: "Password must be at least 8 characters" })
            .regex(
                /[A-Z]/,
                "Password must be include a mix of letters (uppercase and lowercase), numbers and special characters"
            )
            .regex(
                /[a-z]/,
                "Password must be include a mix of letters (uppercase and lowercase), numbers and special characters"
            )
            .regex(
                /[0-9]/,
                "Password must be include a mix of letters (uppercase and lowercase), numbers and special characters"
            )
            .regex(/^[^\s]+$/, "Password must not contain white spaces")
            .regex(
                /[!@#$%&*]/,
                "Password must be include a mix of letters (uppercase and lowercase), numbers and special characters"
            ),
        confirmPassword: z
            .string()
            .min(1, { message: "Confrim password is required" })
            .min(8, { message: "Confrim password must be at least 8 characters" }),
        email: z.string().email(),
    })
    .refine(
        (values) => {
            return values.password === values.confirmPassword;
        },
        {
            message: "Passwords must match!",
            path: ["confirmPassword"],
        }
    );

export const loginSchema = z.object({
    username: z.string().min(1, { message: "Username is required field" }),
    password: z.string().min(1, { message: "Password is required field" }),
});

export const resetPasswordSchema = z
    .object({
        password: z
            .string()
            .min(1, { message: "Password is required" })
            .min(8, { message: "Password must be at least 8 characters" })
            .regex(
                /[A-Z]/,
                "Password must be include a mix of letters (uppercase and lowercase), numbers and special characters"
            )
            .regex(
                /[a-z]/,
                "Password must be include a mix of letters (uppercase and lowercase), numbers and special characters"
            )
            .regex(
                /[0-9]/,
                "Password must be include a mix of letters (uppercase and lowercase), numbers and special characters"
            )
            .regex(/^[^\s]+$/, "Password must not contain white spaces")
            .regex(
                /[!@#$%&*]/,
                "Password must be include a mix of letters (uppercase and lowercase), numbers and special characters"
            ),
        confirmPassword: z
            .string()
            .min(1, { message: "Confrim password is required" })
            .min(8, { message: "Confrim password must be at least 8 characters" }),
    })
    .refine(
        (values) => {
            return values.password === values.confirmPassword;
        },
        {
            message: "Passwords must match!",
            path: ["confirmPassword"],
        }
    );

export const createClassSchema = z.object({
    name: z.string().min(1, { message: "Class name is required field" }),
    title: z.string(),
    description: z.string(),
    subject: z.string(),
});

export const addGradeCompositionSchema = z.object({
    name: z.string().min(1, { message: "Name is required field" }),
    scale: z.coerce
        .number()
        .min(1, { message: "Scale must be greater than 0" })
        .max(100, { message: "Scale must be less than 100" }),
});
