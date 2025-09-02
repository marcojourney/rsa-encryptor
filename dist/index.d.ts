/**
 * Encrypts a plaintext string using AES-256-GCM
 * @param plaintext - The string to encrypt
 * @param key - 32 bytes key (Buffer or hex string)
 * @returns Base64 encoded string of iv + encrypted content + auth tag
 */
export declare function encrypt(plaintext: string, key: Buffer | string): string;
/**
 * Decrypts a base64 encoded string encrypted by AES-256-GCM
 * @param encryptedData - Base64 encoded string of iv + encrypted content + auth tag
 * @param key - 32 bytes key (Buffer or hex string)
 * @returns Decrypted plaintext string
 */
export declare function decrypt(encryptedData: string, key: Buffer | string): string;
