const crypto = require('crypto');
const fs = require('fs');
const http = require('http');

http.get('http://localhost:3000', (res) => {
  let rawData = '';
  res.on('data', (chunk) => {
    rawData += chunk;
  });
  res.on('end', () => {
    const receivedData = JSON.parse(rawData);
    //console.log(receivedData);
  });
});

// 接收到的數據
const rawData = fs.readFileSync('data.json');
const receivedData = JSON.parse(rawData);


const hash = crypto.createHash('RSA-SHA256');
hash.update(receivedData.message);
const hashedMessage = hash.digest('hex');



// 使用公開金鑰驗證簽章
const verifys = crypto.createVerify('RSA-SHA256');
verifys.update(hashedMessage);
const isVerified = verifys.verify(receivedData.publicKey, receivedData.signature, 'hex');

if (isVerified) {
  console.log('Signature verified.');
  console.log('message: ',receivedData.message);
  console.log('hashValue:',hashedMessage)
} else {
  console.log('Signature verification failed.');
}