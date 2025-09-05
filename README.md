
# 📦 @marcobytes/rsa-encryptor

RSA encryption and decryption library for Node.js and TypeScript.  
Designed for simplicity, security, and community use.

---

## 🚀 Features

* 🔒 **RSA**: Public/private key encryption
* 🟦 **TypeScript support**: Full typings included
* ⚡ **Lightweight**: Uses Node.js built-in `crypto`
* ✅ **Tested**: Unit tests with [Vitest](https://vitest.dev/)
* 📖 **Open Source**: MIT licensed

---

## 📥 Installation

```bash
npm install @marcobytes/rsa-encryptor
````

or with yarn:

```bash
yarn add @marcobytes/rsa-encryptor
```

---

## 🛠 Usage

### ES Modules / TypeScript

```ts
import { generateRSAKeyPair, encrypt, decrypt } from "@marcobytes/rsa-encryptor";

// Generate RSA key pair
const { publicKey, privateKey } = generateRSAKeyPair();

// Message
const plaintext = "Hello RSA!";

// Encrypt with public key
const encrypted = encrypt(plaintext, publicKey);
console.log("Encrypted:", encrypted);

// Decrypt with private key
const decrypted = decrypt(encrypted, privateKey);
console.log("Decrypted:", decrypted);
```

### CommonJS

```js
const { generateRSAKeyPair, encrypt, decrypt } = require("@marcobytes/rsa-encryptor");
```

---

## 📂 API Reference

### `generateRSAKeyPair(modulusLength = 2048): { publicKey: string, privateKey: string }`

Generates an RSA key pair.

* `modulusLength`: RSA key size in bits (default 2048)
* Returns: PEM formatted `{ publicKey, privateKey }`

---

### `encrypt(plaintext: string, publicKey: string): string`

Encrypts a UTF-8 string using the provided RSA public key.

* `plaintext`: string to encrypt
* `publicKey`: PEM formatted RSA public key

Returns:

* Base64 encoded ciphertext

---

### `decrypt(ciphertext: string, privateKey: string): string`

Decrypts ciphertext back to plaintext using the RSA private key.

* `ciphertext`: Base64 encoded encrypted string
* `privateKey`: PEM formatted RSA private key

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

* [ ] Support for different padding modes (PKCS#1 v1.5, OAEP with SHA-512)
* [ ] CLI tool for generating RSA keys
* [ ] File encryption/decryption helpers

---

## 🤝 Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

---

## 📜 License

MIT © 2025 [Marco Bytes](https://github.com/marcojourney)
