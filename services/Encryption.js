const {
    createDecipheriv,
    createCipheriv,
    createHash
} = require('crypto');
class EncryptionService {
    constructor( { method, key, iv } ) {
        const encKey = createHash('sha512')
            .update(key)
            .digest('hex')
            .substring(0, 32)
        const encIv = createHash('sha512')
            .update(iv)
            .digest('hex')
            .substring(0, 16)
        this.cipher = createCipheriv(method, encKey, encIv)
        this.decipher = createDecipheriv(method, encKey, encIv)
    }

    encrypt(data) {
        let encrypted = this.cipher.update(data, 'utf8', 'hex');
        encrypted += this.cipher.final('hex');
        return Buffer.from(encrypted).toString('base64');
    }
    decrypt(encryptedData) {
        const buff = Buffer.from(encryptedData, 'base64')
        let decrypted = this.decipher.update(buff.toString('utf8'), 'hex', 'utf8');
        decrypted += this.decipher.final('utf8');
        return decrypted;
    }
}

module.exports = EncryptionService;