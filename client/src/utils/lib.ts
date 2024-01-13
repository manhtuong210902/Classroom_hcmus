import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getFirstCharacter(input: string): string {
    if (!input) {
        return "";
    }
    return input.charAt(0);
}

export const generateRandomString = () => {
    const length = 10;
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }

    return result;
};

export function convertTimestampToFormattedDate(timestampStr: string) {
    if (!timestampStr) return;
    // Convert the timestamp to a Date object
    var timestamp = new Date(timestampStr);

    // Format the Date object as "MMM DD, YYYY"
    var options: any = { year: "numeric", month: "short", day: "numeric" };
    var formattedDate = timestamp.toLocaleDateString("en-US", options);

    return formattedDate;
}
