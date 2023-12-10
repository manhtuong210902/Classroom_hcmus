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
