import { encrypt, decrypt } from "aes-gcm-encryptor";

// 32-byte key (hex string or Buffer)
const key = "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";

const data = "Sensitive data";

const encrypted = encrypt(data, key);
console.log("Encrypted:", encrypted);

const decrypted = decrypt(encrypted, key);
console.log("Decrypted:", decrypted);
