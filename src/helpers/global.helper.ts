import { randomBytes } from "crypto";

export const baseUrl = (path: string) => {
    const appUrl = process.env['APP_URL'] ?? "http://localhost";
    if (!path.startsWith("/")) {
        path = `/${path}`;
    }

    if (path == "/") {
        return appUrl;
    }

    return `${appUrl + path}`;
}

export const validVehicleNumber = (vehicleNumber: string) => {
    if (!vehicleNumber) {
        return false;
    }

    const regex = /^[A-Z]{1,2}\s?\d{1,4}\s?[A-Z]{0,3}$/;
    const isValid = regex.test(vehicleNumber.toUpperCase());

    return isValid;
}

export function isStringNumeric(str: string) {
    return /^\d+$/.test(str);
}

export const isPublicUrl = (path: string) => {
    const publicUrl: string[] = ["/api/presentation/*"];
    let isPublicUrl = false;

    for (const url of publicUrl) {
        const match = new RegExp(url).test(path);
        if (match) {
            isPublicUrl = true;
            break;
        }
    }

    return isPublicUrl;
}

export const removeTrailingSlash = (url: string) => {
    return url.replace(/\/$/, "");
}

export const toNumber = (n: any) => {
    const x = parseFloat(n);
    if (isNaN(x)) {
        return 0;
    }

    return x;
}

/**
 * Generates a secure forgot password token.
 * @param length - The length of the token to be generated.
 * @returns A secure random token.
 */
export const generateForgotPasswordToken = (length: number = 32) => {
    // Generate a random buffer and convert it to a hex string
    const buffer = randomBytes(length);

    return buffer.toString('hex');
}

/**
 * Checks if a string is a valid email address.
 * 
 * @param email - The string to be checked.
 * @returns True if the string is a valid email address, otherwise false.
 */
export const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export const flattenArray = (arr: any[]): any[] => {
    return arr.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenArray(val)) : acc.concat(val), []);
}