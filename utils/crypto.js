import crypto from 'k6/crypto';

export function generateSignature(reqUrl, method, ssk) {
  return crypto.sha256(`${reqUrl}:${ssk}:${method}`, 'hex');
}
