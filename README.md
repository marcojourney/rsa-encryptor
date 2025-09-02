# 📦 @marcobytes/aes-gcm-encryptor

AES-256-GCM encryption and decryption library for Node.js and TypeScript.
Designed for simplicity, security, and community use.

---

## 🚀 Features

* 🔒 **AES-256-GCM**: Secure authenticated encryption
* 🟦 **TypeScript support**: Full typings included
* ⚡ **Lightweight**: No external crypto dependencies, uses Node.js built-in `crypto`
* ✅ **Tested**: Unit tests with [Vitest](https://vitest.dev/)
* 📖 **Open Source**: MIT licensed

---

## 📥 Installation

```bash
npm install @marcobytes/aes-gcm-encryptor
```

or with yarn:

```bash
yarn add @marcobytes/aes-gcm-encryptor
```

---

## 🛠 Usage

### ES Modules / TypeScript

```ts
import { encrypt, decrypt } from "@marcobytes/aes-gcm-encryptor";

const secretKey = crypto.randomBytes(32); // 256-bit key
const plaintext = "Hello world!";

// Encrypt
const { iv, ciphertext, authTag } = encrypt(plaintext, secretKey);
console.log("Ciphertext:", ciphertext.toString("base64"));

// Decrypt
const decrypted = decrypt({ iv, ciphertext, authTag }, secretKey);
console.log("Decrypted:", decrypted);
```

### CommonJS

```js
const { encrypt, decrypt } = require("@marcobytes/aes-gcm-encryptor");
```

---

## 📂 API Reference

### `encrypt(plaintext: string, key: Buffer): { iv: Buffer, ciphertext: Buffer, authTag: Buffer }`

Encrypts a UTF-8 string using AES-256-GCM.

* `plaintext`: string to encrypt
* `key`: 32-byte Buffer (256-bit secret key)

Returns:

* `iv`: random initialization vector (16 bytes)
* `ciphertext`: encrypted data
* `authTag`: authentication tag for integrity check

---

### `decrypt(data: { iv: Buffer, ciphertext: Buffer, authTag: Buffer }, key: Buffer): string`

Decrypts ciphertext back to plaintext.

* `data`: object containing `{ iv, ciphertext, authTag }`
* `key`: 32-byte Buffer (same key used for encryption)

Returns:

* Decrypted UTF-8 string

---

## 🧪 Running Tests

```bash
npm test
```

---

## 📦 Publishing (for maintainers)

Build before publishing:

```bash
npm run build
```

Then publish:

```bash
npm publish --access public
```

---

## 📌 Roadmap

* [ ] Support for custom key derivation (PBKDF2, HKDF)
* [ ] Browser-compatible build (using Web Crypto API)
* [ ] CLI tool for quick file encryption/decryption

---

## 🤝 Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

---

## 📜 License

MIT © 2025 [Marco Bytes](https://github.com/marcobytes)

---

👉 Do you want me to also **draft the actual `encrypt.ts` and `decrypt.ts` code** so your library has a ready-to-publish working implementation?
