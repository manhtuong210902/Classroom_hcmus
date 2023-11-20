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
