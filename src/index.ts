import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12;
const TAG_LENGTH = 16;

/**
 * Encrypts a plaintext string using AES-256-GCM
 * @param plaintext - The string to encrypt
 * @param key - 32 bytes key (Buffer or hex string)
 * @returns Base64 encoded string of iv + encrypted content + auth tag
 */
export function encrypt(plaintext: string, key: Buffer | string): string {
  if (typeof key === "string") {
    key = Buffer.from(key, "hex");
  }
  if (!Buffer.isBuffer(key) || key.length !== 32) {
    throw new Error("Key must be a 32-byte buffer or 64-character hex string");
  }

  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv, { authTagLength: TAG_LENGTH });

  const encrypted = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();

  return Buffer.concat([iv, encrypted, tag]).toString("base64");
}

/**
 * Decrypts a base64 encoded string encrypted by AES-256-GCM
 * @param encryptedData - Base64 encoded string of iv + encrypted content + auth tag
 * @param key - 32 bytes key (Buffer or hex string)
 * @returns Decrypted plaintext string
 */
export function decrypt(encryptedData: string, key: Buffer | string): string {
  if (typeof key === "string") {
    key = Buffer.from(key, "hex");
  }
  if (!Buffer.isBuffer(key) || key.length !== 32) {
    throw new Error("Key must be a 32-byte buffer or 64-character hex string");
  }

  const data = Buffer.from(encryptedData, "base64");
  const iv = data.slice(0, IV_LENGTH);
  const tag = data.slice(data.length - TAG_LENGTH);
  const ciphertext = data.slice(IV_LENGTH, data.length - TAG_LENGTH);

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv, { authTagLength: TAG_LENGTH });
  decipher.setAuthTag(tag);

  const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
  return decrypted.toString("utf8");
}
