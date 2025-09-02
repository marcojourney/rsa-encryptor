"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aes_gcm_encryptor_1 = require("aes-gcm-encryptor");
// 32-byte key (hex string or Buffer)
const key = "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";
const data = "Sensitive data";
const encrypted = (0, aes_gcm_encryptor_1.encrypt)(data, key);
console.log("Encrypted:", encrypted);
const decrypted = (0, aes_gcm_encryptor_1.decrypt)(encrypted, key);
console.log("Decrypted:", decrypted);
