import crypto from 'crypto';
const password = '2026oasi';
const hash = crypto.createHash('sha256').update(password).digest('hex');
console.log(hash);
