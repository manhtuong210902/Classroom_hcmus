import * as z from "zod";

export const sigupSchema = z
    .object({
        fullname: z.string().trim().min(6, {
            message: "Your full name invalid",
        }),
        username: z.string().min(6, {
            message: "Username must be at least 6 characters.",
        }),
        password: z.string().min(8, {
            message: "Password must be at least 8 characters and contain 1 uppercase, 1 lowercase, and 1 number",
        }),
        confirmPassword: z.string().min(8),
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
    username: z.string().min(6, {
        message: "Username must be at least 6 characters.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters and contain 1 uppercase, 1 lowercase, and 1 number",
    }),
});
