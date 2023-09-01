const crypto = require('crypto');
const fs = require('fs');
const http = require('http');
// 創建一個 RSA 金鑰對，用於數位簽章和解密
const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
  },
});
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(dataToSend));
  });
  
  server.listen(3000, () => {
    console.log('Server is listening on port 3000');
  });

const message = 'hello bob!';
const hash = crypto.createHash('RSA-SHA256');
hash.update(message);
const hashValue = hash.digest('hex');

// 使用私密金鑰簽署訊息
const sign = crypto.createSign('RSA-SHA256');
sign.update(hashValue);
const signature = sign.sign(privateKey, 'hex');

// 傳送訊息和簽章給Ｂ
const dataToSend = {
  message,
  hashValue,
  signature,
  publicKey,
};
fs.writeFileSync('data.json', JSON.stringify(dataToSend)); 
console.log('Message sent:', dataToSend);