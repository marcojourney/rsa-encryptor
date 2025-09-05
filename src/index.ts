import crypto from "crypto";

/**
 * Encrypts plaintext using RSA public key
 * @param plaintext - The string to encrypt
 * @param publicKey - PEM formatted RSA public key
 * @returns Base64 encoded encrypted string
 */
export function encrypt(plaintext: string, publicKey: string): string {
  const buffer = Buffer.from(plaintext, "utf8");
  const encrypted = crypto.publicEncrypt(
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING, // OAEP recommended
      oaepHash: "sha256", // Secure hash for OAEP
    },
    buffer
  );
  return encrypted.toString("base64");
}

/**
 * Decrypts ciphertext using RSA private key
 * @param encryptedData - Base64 encoded encrypted string
 * @param privateKey - PEM formatted RSA private key
 * @returns Decrypted plaintext string
 */
export function decrypt(encryptedData: string, privateKey: string): string {
  const buffer = Buffer.from(encryptedData, "base64");
  const decrypted = crypto.privateDecrypt(
    {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    buffer
  );
  return decrypted.toString("utf8");
}

/**
 * Generates an RSA key pair
 * @param modulusLength - Key size in bits (default 2048)
 * @returns { publicKey, privateKey } in PEM format
 */
export function generateRSAKeyPair(modulusLength = 2048): { publicKey: string; privateKey: string } {
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength,
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
    },
  });

  return { publicKey, privateKey };
}
