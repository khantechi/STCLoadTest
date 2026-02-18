export function getHeaders(options = {}) {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (options.authToken) {
    headers['Authorization'] = options.authToken;
  }

  if (options.identityToken) {
    headers['identityToken'] = options.identityToken;
  }

  if (options.extraHeaders) {
    Object.assign(headers, options.extraHeaders);
  }

  return headers;
}
