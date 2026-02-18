import http from 'k6/http';
import { check } from 'k6';
import { getHeaders } from '../utils/headers.js';

export function login(ctx, baseUrl, appKey) {
  const res = http.post(
    `${baseUrl}/identity-v2/v4/${appKey}/login/credentials`,
    JSON.stringify({
      username: ctx.username,
      password: ctx.password,
      userAgent: ctx.userAgent,
      tokenNeeded: "false",
    }),
    { headers: getHeaders(), tags: { name: 'Login API' } }
  );

  check(res, { 'login success': r => r.status === 200 });

  const body = res.json();
  ctx.authToken = body.data.authToken;
  ctx.guid = body.guid;
  ctx.accountId = body.data.accountId;
  ctx.refreshToken = body.data.refreshToken;
  ctx.identityToken = body.data.identityToken;
  ctx.apiKey = body.data.apiKey;
  return ctx;
}
