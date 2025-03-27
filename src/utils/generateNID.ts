import crypto from "crypto";

/**
 *
 * @returns {string}
 * @description (generateNumericID) Generates a random numeric ID.
 */
export function generateNID() {
    const randomBytes = crypto.randomBytes(4); // Generate 4 random bytes
    const numericId = parseInt(randomBytes.toString("hex"), 16).toString(); // Convert to base16 (hexadecimal) and then to base10 (decimal)
    return numericId;
}
